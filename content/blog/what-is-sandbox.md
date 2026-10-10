---
title: "What is sandbox?"
date: "2026-03-19T22:37:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Everyone in the AI agent space is talking about sandboxes. As coding agents like Claude Code, Codex, and Gemini CLI become more autonomous, the question of *where* they run, and how safely, has moved from a niche infrastructure concern to a core design decision.
But "sandbox" is a loose term. A browser tab is sandboxed. A Docker container is sandboxed. A WebAssembly module is sandboxed. An entire microVM is sandboxed. They're all called sandboxes, but they are not the same thing. They operate at different layers of the stack, offer different security guarantees, and make different tradeoffs.
This post breaks down the major types of sandboxes, how each one works under the hood, and when you'd pick one over another.
## What a sandbox actually means
A sandbox is an isolated environment that restricts what a program can access. The metaphor comes from a child's sandbox: a contained space where you can build, break, and experiment without affecting the real world.
In computing, this means limiting a program's access to the filesystem, network, memory, system calls, or other processes. The goal is always the same: let code run freely within its boundaries while preventing it from reaching anything outside them.
What changes across sandbox types is *where the boundary is drawn* and *how it's enforced*.
## Browser-level sandboxing
Every modern browser is a sandbox. When you open a tab in Chrome, that tab runs in its own renderer process with heavily restricted permissions. It cannot read your files, access system APIs, or peek into other tabs' memory.
Chrome enforces this through **process isolation**. Each site gets its own operating system process, and that process runs inside a restricted sandbox that strips away most system privileges. The renderer process handles parsing HTML, running JavaScript, and painting pixels, but it must ask the browser's main process (which has higher privileges) for anything else, like network requests or file access.
On top of process isolation, Chrome implements **site isolation**, which ensures that pages from different origins always land in different processes. This was introduced as a defense against Spectre-class attacks, where a malicious page could potentially read memory from a co-located page through CPU-level side channels.
The sandbox uses OS-specific mechanisms to lock down the renderer:
- **Linux**: seccomp-BPF filters to restrict system calls, plus namespaces for filesystem isolation
- **Windows**: restricted tokens and job objects that limit what the process can do
- **macOS**: the Seatbelt sandbox profile that restricts file, network, and IPC access
Browser sandboxing is well-tested and battle-hardened, but it's designed for web content, not for running arbitrary code or AI agents. The sandbox assumes a cooperative model where the renderer follows the rules of web APIs.
## OS-level and shell-level sandboxing
Operating systems provide their own sandboxing primitives. These are the building blocks that most other sandbox technologies are built on top of.
**Linux namespaces** isolate what a process can see. A process in its own namespace has a separate view of the filesystem, network interfaces, process tree, and user IDs. It genuinely believes it's the only thing running.
**seccomp-BPF** restricts *which system calls* a process can make. You can define a whitelist of allowed syscalls and block everything else. This is powerful because even if code manages to run, it can't do anything dangerous if the kernel refuses its requests.
**cgroups** limit *how much* of the system's resources a process can consume: CPU time, memory, disk I/O, and network bandwidth.
**macOS Sandbox (Seatbelt)** uses profile-based rules to restrict application behavior. Apps on macOS can be confined to specific directories and denied network or hardware access.
Claude Code's native sandboxing is a good example of shell-level sandboxing in practice. Instead of asking the user for permission on every bash command, it creates a sandbox using OS-level primitives (seccomp on Linux, Seatbelt on macOS) that restricts both filesystem and network access. The agent gets a defined working area and can operate freely within it, but cannot reach outside.
This approach is lightweight and doesn't need containers or VMs. But it only works when the host OS supports the right primitives, and it depends on correct configuration, a misconfigured policy can leave gaps.
## Container-level sandboxing
Containers are the most widely used sandbox in production. Docker popularized the model: package an application with its dependencies, then run it in an isolated environment that shares the host's kernel.
Under the hood, a Docker container uses Linux namespaces for isolation, cgroups for resource limits, and a layered filesystem (like OverlayFS) to give each container its own file tree. The container sees its own root filesystem, its own process tree, and its own network stack. But it shares the host kernel.
That kernel sharing is both the strength and weakness of containers. It makes them fast to start (milliseconds), lightweight on memory, and easy to manage. But it also means a kernel vulnerability can potentially be exploited from within a container to affect the host.
For many use cases, this is fine. But for running untrusted AI-generated code, standard Docker containers may not provide enough isolation.
**Docker Sandboxes** (the product specifically for AI agents) go further by running each agent inside a **microVM**, not just a container. Each sandbox gets its own kernel, its own Docker daemon, and full isolation at the hypervisor level. This means an agent can spin up test containers, install packages, and modify its environment without any risk to the host system.
## MicroVM sandboxing
MicroVMs sit between containers and full virtual machines. They provide VM-level isolation, each instance gets its own kernel, but they're designed to boot in milliseconds and use minimal resources.
**Firecracker**, built by AWS for Lambda and Fargate, is the most prominent example. It's a lightweight virtual machine monitor (VMM) that uses KVM to create isolated environments. Each microVM boots a minimal Linux kernel, gets its own memory space, and is completely separated from other microVMs at the hardware level. Firecracker microVMs can boot in under 125 milliseconds and run with as little as 5 MB of memory overhead.
**E2B** uses Firecracker to provide code execution sandboxes specifically for AI agents. Each execution gets its own microVM with a dedicated kernel, so a kernel-level exploit in one sandbox cannot affect another.
**gVisor**, developed by Google, takes a different approach. Instead of running a full guest kernel, gVisor implements a user-space kernel (called Sentry) that intercepts and re-implements system calls. The container's code never directly interacts with the host kernel. gVisor integrates seamlessly with existing container tooling (just swap the runtime from `runc` to `runsc`), but not all syscalls are supported, so some workloads may not be compatible.
**Kata Containers** wrap traditional container images in lightweight VMs using Firecracker or QEMU as the underlying hypervisor. It gives you the developer experience of containers with the isolation guarantees of VMs.
The tradeoff with microVMs is operational complexity. Firecracker requires managing kernel images, root filesystems, and network configuration. gVisor is easier to integrate but adds syscall overhead. Kata Containers splits the difference with a Kubernetes-native interface.
## WebAssembly sandboxing
WebAssembly (Wasm) offers a fundamentally different approach. Rather than isolating at the process, container, or VM level, Wasm isolates at the *instruction* level through software fault isolation.
A Wasm module runs inside a **linear memory model**: a single, contiguous block of bytes that the module can read and write. Every memory access is bounds-checked, and the module has no way to reference memory outside its allocated block. There are no raw pointers to host memory, no way to make arbitrary system calls, and no access to the filesystem or network unless the host runtime explicitly grants it.
This is a **deny-by-default** model. A Wasm module starts with zero capabilities. The host decides exactly what to expose, such as specific directories, environment variables, or network endpoints, through WASI (WebAssembly System Interface).
Runtimes like Wasmtime and Wasmer compile Wasm bytecode to native machine code with safety checks baked in. The result is near-native execution speed with strong isolation guarantees. Startup times are extremely fast (often sub-millisecond) and memory overhead is minimal compared to containers or VMs.
NVIDIA has explored using Wasm for sandboxing agentic AI tool calls. Projects like Amla Sandbox use Wasm with WASI to provide a bash shell environment for AI agents, with every tool call going through capability validation.
The limitation is ecosystem maturity. Not every language or library compiles easily to Wasm, and the WASI standard is still evolving. For AI agents that need to install arbitrary packages, run complex build systems, or interact with databases, Wasm sandboxes can feel restrictive.
## AI agent sandbox platforms
A growing category of platforms packages these isolation technologies into developer-friendly APIs specifically designed for AI agents.
**Daytona** provides full composable sandbox environments: each one gets a dedicated kernel, filesystem, network stack, and allocated CPU, RAM, and disk. Sandboxes are built from OCI-compliant images (so you can use any Docker image) and support snapshotting and forking. Daytona's sandboxes are stateful and persistent, meaning an agent can install dependencies, save progress, and return later. Startup time is under 90 milliseconds.
**E2B** focuses on ephemeral execution with Firecracker microVMs. It's optimized for stateless code execution where each run gets a fresh, isolated environment that's destroyed afterward. The emphasis is on security through true VM-level isolation.
**Modal** provides serverless sandboxes with particular strength in GPU workloads. Each function runs in a gVisor-isolated container with per-second billing.
[**Fly.io**](http://Fly.io)** Sprites** offers Firecracker-based sandboxes with a simple API for spinning up isolated environments on demand.
The key difference between these platforms is the persistence model. Daytona and Sprites offer persistent, stateful environments where agents can maintain context across sessions. E2B provides ephemeral sandboxes that enforce clean-slate execution. Your choice depends on whether your agent needs to remember what it did last time.
## How they compare
<table fit-page-width="true" header-row="true">
<tr>
<td>**Type**</td>
<td>**Isolation boundary**</td>
<td>**Startup time**</td>
<td>**Overhead**</td>
<td>**Best for**</td>
</tr>
<tr>
<td>Browser</td>
<td>Process + OS sandbox</td>
<td>Fast</td>
<td>Low</td>
<td>Web content rendering</td>
</tr>
<tr>
<td>OS/Shell</td>
<td>Syscall + namespace</td>
<td>Instant</td>
<td>Minimal</td>
<td>Local agent tooling (Claude Code)</td>
</tr>
<tr>
<td>Container (Docker)</td>
<td>Namespace + cgroups</td>
<td>Milliseconds</td>
<td>Low</td>
<td>Application packaging, trusted workloads</td>
</tr>
<tr>
<td>MicroVM (Firecracker)</td>
<td>Hypervisor + kernel</td>
<td>\~125ms</td>
<td>Medium</td>
<td>Untrusted code, multi-tenant</td>
</tr>
<tr>
<td>gVisor</td>
<td>User-space kernel</td>
<td>Milliseconds</td>
<td>Low-medium</td>
<td>Enhanced containers, easy integration</td>
</tr>
<tr>
<td>WebAssembly</td>
<td>Linear memory + SFI</td>
<td>Sub-millisecond</td>
<td>Minimal</td>
<td>Lightweight tool calls, plugins</td>
</tr>
<tr>
<td>Agent platforms</td>
<td>Varies (VM/container)</td>
<td>\~90ms-200ms</td>
<td>Medium</td>
<td>Full agent workflows</td>
</tr>
</table>
## Picking the right sandbox
The right sandbox depends on your threat model and use case.
If you're building a coding agent that runs locally on a developer's machine, **OS-level sandboxing** (like Claude Code's native approach) keeps things lightweight while preventing the agent from accessing files outside the project.
If you're running untrusted code from users or AI agents in production, **microVMs** (Firecracker, Docker Sandboxes) give you the strongest isolation. The hypervisor boundary is the same one that separates tenants on AWS.
If you need fast, lightweight isolation for tool calls or plugins, **WebAssembly** is compelling. The deny-by-default capability model is a natural fit for restricting what an agent's tools can access.
If you want a managed, end-to-end solution for agent workflows, **platforms like Daytona or E2B** abstract away the infrastructure and let you focus on the agent logic.
The industry is converging on a clear principle: let the agent reason freely, let the sandbox enforce the boundaries. The specific technology matters less than getting the boundaries right.
## References
1. "Sandbox (computer security)," Wikipedia, [https://en.wikipedia.org/wiki/Sandbox_(computer_security)](https://en.wikipedia.org/wiki/Sandbox_(computer_security))
2. "Site Isolation," The Chromium Projects, [https://www.chromium.org/Home/chromium-security/site-isolation/](https://www.chromium.org/Home/chromium-security/site-isolation/)
3. "Process Model and Site Isolation," Chromium Docs, [https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md](https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md)
4. "Sandboxing," Claude Code Docs, [https://code.claude.com/docs/en/sandboxing](https://code.claude.com/docs/en/sandboxing)
5. "Docker Sandboxes," Docker Docs, [https://docs.docker.com/ai/sandboxes/](https://docs.docker.com/ai/sandboxes/)
6. "Sandboxes," Daytona Docs, [https://www.daytona.io/docs/en/sandboxes/](https://www.daytona.io/docs/en/sandboxes/)
7. "Security," [WebAssembly.org](http://WebAssembly.org), [https://webassembly.org/docs/security/](https://webassembly.org/docs/security/)
8. "Sandboxing Agentic AI Workflows with WebAssembly," NVIDIA Technical Blog, [https://developer.nvidia.com/blog/sandboxing-agentic-ai-workflows-with-webassembly/](https://developer.nvidia.com/blog/sandboxing-agentic-ai-workflows-with-webassembly/)
9. "Daytona vs E2B in 2026: which sandbox for AI code execution?" Northflank, [https://northflank.com/blog/daytona-vs-e2b-ai-code-execution-sandboxes](https://northflank.com/blog/daytona-vs-e2b-ai-code-execution-sandboxes)
10. "Best sandboxes for coding agents in 2026," Northflank, [https://northflank.com/blog/best-sandboxes-for-coding-agents](https://northflank.com/blog/best-sandboxes-for-coding-agents)
11. "Firecracker vs gVisor," Northflank, [https://northflank.com/blog/firecracker-vs-gvisor](https://northflank.com/blog/firecracker-vs-gvisor)
12. "How WebAssembly Offers Secure Development through Sandboxing," The New Stack, [https://thenewstack.io/how-webassembly-offers-secure-development-through-sandboxing/](https://thenewstack.io/how-webassembly-offers-secure-development-through-sandboxing/)

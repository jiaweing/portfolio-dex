import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

// Map code block language names to Shiki lang IDs
const LANGUAGE_MAP: Partial<Record<string, BundledLanguage>> = {
  abap: "abap",
  bash: "bash",
  shell: "bash",
  c: "c",
  "c++": "cpp",
  "c#": "csharp",
  clojure: "clojure",
  coffeescript: "coffeescript",
  css: "css",
  dart: "dart",
  diff: "diff",
  docker: "docker",
  elixir: "elixir",
  elm: "elm",
  erlang: "erlang",
  "f#": "fsharp",
  flow: "javascript",
  go: "go",
  graphql: "graphql",
  groovy: "groovy",
  haskell: "haskell",
  hcl: "hcl",
  html: "html",
  java: "java",
  javascript: "javascript",
  json: "json",
  julia: "julia",
  kotlin: "kotlin",
  latex: "latex",
  less: "less",
  lisp: "lisp",
  lua: "lua",
  makefile: "makefile",
  markdown: "markdown",
  matlab: "matlab",
  mermaid: "mermaid",
  "objective-c": "objc",
  ocaml: "ocaml",
  pascal: "pascal",
  perl: "perl",
  php: "php",
  powershell: "powershell",
  prolog: "prolog",
  protobuf: "proto",
  python: "python",
  r: "r",
  ruby: "ruby",
  rust: "rust",
  sass: "sass",
  scala: "scala",
  scheme: "scheme",
  scss: "scss",
  sql: "sql",
  swift: "swift",
  toml: "toml",
  typescript: "typescript",
  verilog: "verilog",
  vhdl: "vhdl",
  webassembly: "wasm",
  xml: "xml",
  yaml: "yaml",
  "java/c/c++/c#": "java",
};

function resolveLanguage(lang: string): BundledLanguage | null {
  if (
    !lang ||
    lang === "plain text" ||
    lang === "ascii art" ||
    lang === "notion formula" ||
    lang === "bnf" ||
    lang === "ebnf" ||
    lang === "glsl" ||
    lang === "livescript" ||
    lang === "llvm ir"
  ) {
    return null;
  }
  return LANGUAGE_MAP[lang.toLowerCase()] ?? null;
}

export async function highlightCode(
  code: string,
  language: string
): Promise<string | null> {
  const lang = resolveLanguage(language);
  if (!lang) return null;

  try {
    return await codeToHtml(code, {
      lang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    });
  } catch {
    return null;
  }
}

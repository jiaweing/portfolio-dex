// Lets plain `bun` scripts import Fumadocs collections from "collections/server".
// Usage: bun --preload ./scripts/fumadocs-preload.ts <script>
import { createMdxPlugin } from "fumadocs-mdx/bun";

declare const Bun: { plugin: (plugin: unknown) => unknown };

await Bun.plugin(createMdxPlugin({ disableMetaFile: true }));

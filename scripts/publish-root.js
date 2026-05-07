import { cp, copyFile, mkdir, rm } from "node:fs/promises";

await mkdir("assets", { recursive: true });
await mkdir("images", { recursive: true });

await rm("assets", { recursive: true, force: true });
await rm("images", { recursive: true, force: true });
await rm("files", { recursive: true, force: true });

await copyFile("dist/index.html", "index.html");
await cp("dist/assets", "assets", { recursive: true });
await cp("dist/images", "images", { recursive: true });
await cp("dist/files", "files", { recursive: true });

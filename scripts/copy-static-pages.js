import { copyFile, mkdir } from "node:fs/promises";

await mkdir("public", { recursive: true });
await copyFile("gamedev.html", "public/gamedev.html");

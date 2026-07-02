import { exec } from "child_process";
import fs from "fs";

export function generateSnake(user) {
  return new Promise((resolve, reject) => {
    const outDir = "./cache";

    const cmd = `
      npx snk@latest -o ${outDir}/snake.svg -u ${user}
    `;

    exec(cmd, (err) => {
      if (err) return reject(err);

      const svg = fs.readFileSync(`${outDir}/snake.svg`, "utf-8");
      resolve(svg);
    });
  });
}

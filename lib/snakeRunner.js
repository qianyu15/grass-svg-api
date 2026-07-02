import { exec } from "child_process";
import fs from "fs";

export function generateSnake(user) {
  return new Promise((resolve, reject) => {
    const outFile = `./cache/snake.svg`;

    const cmd = `npx snk@latest ${user} > ${outFile}`;

    exec(cmd, (err) => {
      if (err) return reject(err);

      const svg = fs.readFileSync(outFile, "utf-8");
      resolve(svg);
    });
  });
}

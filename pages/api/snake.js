import { generateSnake } from "../../lib/snakeRunner.js";

export default async function handler(req, res) {
  const user = req.query.user;

  if (!user) {
    return res.status(400).send("Missing ?user=");
  }

  try {
    const svg = await generateSnake(user);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-maxage=86400"); // 1日キャッシュ
    res.status(200).send(svg);

  } catch (e) {
    res.status(500).send("Snake generation failed");
  }
}

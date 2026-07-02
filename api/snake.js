import { getContributions } from "../lib/github.js";
import { generateSnakeSVG } from "../lib/snake.js";

export default async function handler(req, res) {
  const user = req.query.user;

  if (!user) {
    return res.status(400).send("Missing ?user=");
  }

  const contributions = await getContributions(user);
  const svg = generateSnakeSVG(contributions, user);

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}

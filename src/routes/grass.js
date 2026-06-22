import express from "express";
import { getGrassData } from "../services/github.js";
import { generateSVG } from "../services/generator.js";
import cache from "../services/cache.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const year = req.query.year || new Date().getFullYear();

  const cacheKey = `${username}-${year}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(cached);
  }

  try {
    const data = await getGrassData(username, year);
    const svg = generateSVG(data);

    cache.set(cacheKey, svg);

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (e) {
    res.status(500).send("grass broke. congrats.");
  }
});

export default router;

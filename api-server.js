import express from "express";
import fetch from "node-fetch";

const app = express();

/**
 * GitHub草データ取得（超簡易）
 */
async function getGrass(username) {
  const query = `
  query {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
            }
          }
        }
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query })
  });

  const json = await res.json();

  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

  if (!weeks) return [];

  return weeks.map(w =>
    w.contributionDays.map(d => d.contributionCount)
  );
}

/**
 * SVG生成
 */
function generateSVG(grid, username) {
  const size = 10;
  const gap = 2;

  const max = Math.max(...grid.flat(), 1);

  const color = (v) => {
    const lvl = Math.ceil((v / max) * 4);
    const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
    return colors[lvl];
  };

  let rects = "";

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      rects += `
        <rect
          x="${x * (size + gap)}"
          y="${y * (size + gap)}"
          width="${size}"
          height="${size}"
          fill="${color(grid[x][y])}"
        />
      `;
    }
  }

  return `
  <svg xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="15" fill="#c9d1d9">${username}</text>
    ${rects}
  </svg>
  `;
}

/**
 * 空チェック（全部0）
 */
function isEmpty(grid) {
  return grid.flat().every(v => v === 0);
}

/**
 * API
 */
app.get("/grass/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const grid = await getGrass(username);

    if (!grid.length) {
      return res.status(404).send("no data");
    }

    const svg = generateSVG(grid, username);

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (e) {
    res.status(500).send(`
      <svg xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="20">API broke</text>
      </svg>
    `);
  }
});

app.get("/", (req, res) => {
  res.send("grass-svg-api is running");
});

app.listen(3000, () => {
  console.log("running on http://localhost:3000");
});

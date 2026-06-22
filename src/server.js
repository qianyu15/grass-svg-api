import express from "express";
import dotenv from "dotenv";
import grassRoute from "./routes/grass.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("grass-svg-api is alive (unfortunately)");
});

app.use("/grass", grassRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});import express from "express";
import dotenv from "dotenv";
import grassRoute from "./routes/grass.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("grass-svg-api is alive (unfortunately)");
});

app.use("/grass", grassRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

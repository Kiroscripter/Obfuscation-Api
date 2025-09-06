const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage
const scripts = {};

// Generate random key
function generateKey(len = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// Upload script endpoint
app.post("/upload", (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "No code provided" });

  const key = generateKey();
  scripts[key] = { code, created: Date.now() };

  res.json({ success: true, key });
});

// Fetch script endpoint
app.get("/script", (req, res) => {
  const { key } = req.query;
  if (!key || !scripts[key]) return res.status(403).send("-- Access denied --");

  const scriptData = scripts[key];
  res.setHeader("Content-Type", "text/plain");
  res.send(scriptData.code);
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));

const express = require("express");
const crypto = require("crypto");
const sendTelegram = require("../services/telegram");
const parseGithubEvent = require("../services/githubParser");

const router = express.Router();

function verifySignature(req, res, next) {
  const signature = req.headers["x-hub-signature-256"];
  const secret = process.env.GITHUB_SECRET;

  if (!signature) return res.status(401).send("No signature");

  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");

  if (signature !== digest) {
    return res.status(401).send("Invalid signature");
  }

  next();
}

router.post("/", async (req, res) => {
  const event = req.headers["x-github-event"];
  const payload = req.body;

  const message = parseGithubEvent(event, payload);

  if (message) {
    await sendTelegram(message);
  }

  res.sendStatus(200);
});

module.exports = router;

const axios = require("axios");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`;

async function sendTelegram(text) {
  try {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: process.env.CHAT_ID,
      text,
      parse_mode: "Markdown",
    });
  } catch (err) {
    console.error("Telegram error:", err.message);
  }
}

module.exports = sendTelegram;

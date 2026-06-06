const axios = require("axios");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`;

async function sendTelegram(text) {
  try {
    const res = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: process.env.CHAT_ID,
      text,
      parse_mode: "Markdown",
    });

    console.log("Telegram SUCCESS:", res.data);

  } catch (err) {
    console.log("Telegram FAILED RESPONSE:");
    console.log(err.response?.data);   // 👈 مهم‌ترین خط
    console.log(err.response?.status);
  }
}

module.exports = sendTelegram;

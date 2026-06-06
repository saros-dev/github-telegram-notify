# 🚀 GitHub Telegram Notifier (DevOps / Event-Driven System)

![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![Docker](https://img.shields.io/badge/Docker-ready-blue) ![Express](https://img.shields.io/badge/Express.js-API-black) ![GitHub Webhooks](https://img.shields.io/badge/GitHub-Webhooks-lightgrey) ![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-blue)

![Demo](https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif)

A production-style event-driven webhook system that integrates GitHub with Telegram for real-time repository activity monitoring. The system receives GitHub webhook events via an Express.js server, validates and parses payloads, formats messages, and sends them instantly to Telegram via Bot API.

System flow: GitHub Webhooks → Express.js API → Event Parser → Message Formatter → Telegram Bot API → Telegram Chat.

The project supports push events, pull requests, and releases, includes optional HMAC SHA-256 verification for security, uses environment variables for configuration, is fully stateless, and fully containerized using Docker.

---

## 🧱 Tech Stack & Architecture

Node.js, Express.js, Docker, GitHub Webhooks, Telegram Bot API

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

PORT=4000  
TELEGRAM_TOKEN=your_telegram_bot_token  
CHAT_ID=your_chat_id  
GITHUB_SECRET=your_webhook_secret  

---

## 🚀 Local Run

Install dependencies and run the server:

npm install  
npm run dev  

The server will start at:

http://localhost:4000/webhook  

---

## 🐳 Docker Run

Build and run container:

docker build -t github-telegram-bot .  
docker run -d --name github-bot -p 4000:4000 --env-file .env --restart always github-telegram-bot  

---

## 🔗 GitHub Webhook Setup

Go to your repository settings → Webhooks → Add webhook

Payload URL:
http://your-server-ip:4000/webhook  

Content type:
application/json  

Events:
Push, Pull Request, Release  

---

## 📬 Example Output

🚀 New Push Event  
📦 Repository: owner/repo  
🌿 Branch: main  
👤 Author: username  
📝 Commits: 3  

• Fix webhook validation  
• Improve formatting  
• Update Docker setup  

---

## 👨‍💻 Author

saros-dev  — DevOps/ Backend Engineer focused on building real-world automation systems.

---

## ⭐ Result

A fully functional GitHub automation system that delivers repository activity directly into Telegram in real time.

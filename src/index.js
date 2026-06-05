const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const webhookRoute = require("./routes/webhook");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/webhook", webhookRoute);

app.get("/", (req, res) => {
  res.send("GitHub Telegram Notifier is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 4000
const webhookRoute = require("./routes/webhook");

const app = express();

app.use(helmet());
app.use(morgan("dev"));

// مهم: raw body برای GitHub
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// log برای debug (خیلی مهم)
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

app.use("/webhook", webhookRoute);

app.get("/", (req, res) => {
  res.send("OK 🚀");
});

app.listen(port, () => {
  console.log("Server running on port 4000");
});

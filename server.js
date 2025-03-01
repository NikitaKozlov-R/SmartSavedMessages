require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = {};

// ПОЛУЧЕНИЕ СООБЩЕНИЙ
app.get("/messages/:userId", (req, res) => {
  const userId = req.params.userId;
  res.json(messages[userId] || []);
});

// СОХАРЕНИЕ СООБЩЕНИЙ
app.post("/messages", (req, res) => {
  const { userId, text } = req.body;
  if (!messages[userId]) {
    messages[userId] = [];
  }
  messages[userId].push(text);
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("Сервер работает! Используйте API через /messages/:userId");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

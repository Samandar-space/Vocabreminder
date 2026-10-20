import express from "express";
import cors from "cors";
import router from "./approuter.js";
import { telegramBot } from "./telegramBot.js";

const app = express();

app.use(cors());

// Content-Type nima bo'lishidan qat'i nazar JSON o'qiydi
app.use(express.json({ type: () => true }));

app.use((req, res, next) => {
  req.body = req.body ?? {};
  next();
});

// REST API for words
app.use("/api/words", router);

// Telegram Bot Webhook & Status endpoints
app.get("/api/telegram/status", (req, res) => {
  res.status(200).json({
    configured: telegramBot.isConfigured(),
    message: telegramBot.isConfigured()
      ? "Telegram Bot faol va sozlangan"
      : "Telegram Bot kaliti (.env TELEGRAM_BOT_TOKEN) kiritilmagan"
  });
});

app.post("/api/telegram/webhook", async (req, res) => {
  try {
    if (req.body && typeof req.body === "object") {
      await telegramBot.handleUpdate(req.body);
    }
    res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook processing error:", err);
    res.status(200).send("OK");
  }
});

// Auto-start polling if token is configured in environment
if (process.env.TELEGRAM_BOT_TOKEN) {
  telegramBot.startPolling();
}

// JSON noto'g'ri yozilsa tushunarli xabar beradi
app.use((err, req, res, next) => {
  res.status(400).json({ message: "JSON noto'g'ri yozilgan", error: err.message });
});

export default app;
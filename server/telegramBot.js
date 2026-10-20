// VocabReminder - Native Lightweight Telegram Bot (Zero external npm dependency)
// Works with Node 18+ native fetch API
import fs from "fs";

const FILE = new URL("./words.json", import.meta.url);

const readWords = () => {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const writeWords = (data) => {
  try {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Faylga yozishda xatolik:", err);
  }
};

export class TelegramBotService {
  constructor(token) {
    this.token = token || process.env.TELEGRAM_BOT_TOKEN;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.polling = false;
    this.lastUpdateId = 0;
  }

  isConfigured() {
    return Boolean(this.token && this.token.length > 15);
  }

  async sendRequest(method, payload = {}) {
    if (!this.isConfigured()) return null;
    try {
      const res = await fetch(`${this.baseUrl}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      console.error(`Telegram API (${method}) xatoligi:`, err.message);
      return null;
    }
  }

  async sendMessage(chatId, text, extra = {}) {
    return this.sendRequest("sendMessage", {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      ...extra
    });
  }

  async answerCallback(callbackQueryId, text = "") {
    return this.sendRequest("answerCallbackQuery", {
      callback_query_id: callbackQueryId,
      text,
      show_alert: false
    });
  }

  // Handle incoming update from Webhook or Polling
  async handleUpdate(update) {
    if (update.message) {
      await this.handleMessage(update.message);
    } else if (update.callback_query) {
      await this.handleCallbackQuery(update.callback_query);
    }
  }

  async handleMessage(msg) {
    const chatId = msg.chat?.id;
    const text = (msg.text || "").trim();
    if (!chatId || !text) return;

    // 1. /start command
    if (text === "/start" || text.startsWith("/start")) {
      const welcome = `
🌟 <b>VocabReminder Botiga Xush Kelibsiz!</b>

Bu bot orqali siz shaxsiy lug'atingizdagi so'zlarni <b>Leitner oraliq takrorlash (Spaced Repetition)</b> usuli bilan o'rganishingiz mumkin.

<b>Mavjud buyruqlar:</b>
📚 /today — Bugun takrorlanishi kerak bo'lgan so'zlar
🎯 /quiz — 4 ta variantli tezkor test
➕ /add <i>so'z - tarjima</i> — Yangi so'z qo'shish
📊 /stats — Shaxsiy lug'at statistikasi
ℹ️ /help — Yordam va ko'rsatmalar
      `;

      const keyboard = {
        keyboard: [
          [{ text: "📚 Bugungi so'zlar" }, { text: "🎯 Tezkor Test" }],
          [{ text: "📊 Statistika" }, { text: "ℹ️ Yordam" }]
        ],
        resize_keyboard: true
      };

      await this.sendMessage(chatId, welcome, { reply_markup: keyboard });
      return;
    }

    // 2. /today or button
    if (text === "/today" || text === "📚 Bugungi so'zlar") {
      const words = readWords();
      if (words.length === 0) {
        await this.sendMessage(chatId, "📭 Lug'atingizda hali so'zlar yo'q. /add buyrug'i orqali yangi so'z qo'shing!");
        return;
      }

      // Pick words due or first 3 words
      const now = new Date();
      const due = words.filter(w => !w.nextReviewDate || new Date(w.nextReviewDate) <= now);
      const toReview = due.length > 0 ? due.slice(0, 5) : words.slice(0, 3);

      await this.sendMessage(chatId, `📖 <b>Bugun takrorlash uchun ${toReview.length} ta so'z:</b>`);

      for (const item of toReview) {
        const wordText = `🔹 <b>${item.word}</b> <i>${item.transcription || ""}</i>\nTarjimasi: <b>${item.translation}</b>${item.example ? `\n<i>"${item.example}"</i>` : ""}\n📦 Quti: #${item.box || 1}`;
        const inlineKeyboard = {
          inline_keyboard: [
            [
              { text: "🟢 Esladim (+1 Quti)", callback_data: `review_easy_${item.id}` },
              { text: "🔴 Eslolmadim", callback_data: `review_hard_${item.id}` }
            ]
          ]
        };
        await this.sendMessage(chatId, wordText, { reply_markup: inlineKeyboard });
      }
      return;
    }

    // 3. /quiz or button
    if (text === "/quiz" || text === "🎯 Tezkor Test") {
      const words = readWords();
      if (words.length < 2) {
        await this.sendMessage(chatId, "⚠️ Test boshlash uchun lug'atda kamida 2 ta so'z bo'lishi kerak.");
        return;
      }

      const randomWord = words[Math.floor(Math.random() * words.length)];
      const others = words.filter(w => w.id !== randomWord.id).map(w => w.translation);
      const shuffledOthers = others.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [randomWord.translation, ...shuffledOthers].sort(() => 0.5 - Math.random());

      const inlineKeyboard = {
        inline_keyboard: options.map((opt) => [
          {
            text: opt,
            callback_data: `quiz_${randomWord.id}_${opt === randomWord.translation ? "1" : "0"}`
          }
        ])
      };

      await this.sendMessage(chatId, `🎯 Quyidagi so'zning to'g'ri tarjimasini toping:\n\n👉 <b>${randomWord.word}</b> ${randomWord.transcription || ""}`, {
        reply_markup: inlineKeyboard
      });
      return;
    }

    // 4. /stats or button
    if (text === "/stats" || text === "📊 Statistika") {
      const words = readWords();
      const boxCounts = [0, 0, 0, 0, 0];
      words.forEach(w => {
        const b = Math.min(5, Math.max(1, w.box || 1));
        boxCounts[b - 1] += 1;
      });

      const statsMsg = `
📊 <b>VocabReminder Lug'at Statistikasi:</b>

📚 Jami so'zlar: <b>${words.length} ta</b>

<b>Leitner Qutilari:</b>
1️⃣ 1-quti (har kuni): ${boxCounts[0]} ta
2️⃣ 2-quti (3 kunda): ${boxCounts[1]} ta
3️⃣ 3-quti (7 kunda): ${boxCounts[2]} ta
4️⃣ 4-quti (14 kunda): ${boxCounts[3]} ta
5️⃣ 5-quti (30 kunda): ${boxCounts[4]} ta
      `;
      await this.sendMessage(chatId, statsMsg);
      return;
    }

    // 5. /add word - translation
    if (text.startsWith("/add") || text.includes(" - ")) {
      let cleanText = text;
      if (cleanText.startsWith("/add")) {
        cleanText = cleanText.replace(/^\/add\s*/, "");
      }

      const parts = cleanText.split(/[-–—:=]/);
      if (parts.length >= 2) {
        const word = parts[0].trim();
        const translation = parts.slice(1).join(" ").trim();
        if (word && translation) {
          const words = readWords();
          const newWord = {
            id: Date.now(),
            word,
            translation,
            transcription: `/${word.toLowerCase()}/`,
            box: 1,
            nextReviewDate: new Date().toISOString(),
            reviewCount: 0,
            correctCount: 0,
            incorrectCount: 0,
            createdAt: new Date().toISOString()
          };
          words.unshift(newWord);
          writeWords(words);

          await this.sendMessage(chatId, `✅ <b>"${word}"</b> so'zi lug'atingizga qo'shildi!\nTarjimasi: <i>${translation}</i>\n📦 1-qutiga joylandi.`);
          return;
        }
      }
    }

    // Fallback info
    await this.sendMessage(chatId, `💡 Yangi so'z qo'shish uchun: <code>/add apple - olma</code> formatida yozing yoki pastdagi menyu tugmalaridan foydalaning.`);
  }

  async handleCallbackQuery(cb) {
    const callbackId = cb.id;
    const chatId = cb.message?.chat?.id;
    const messageId = cb.message?.message_id;
    const data = cb.data || "";

    // 1. Spaced Repetition Answers
    if (data.startsWith("review_easy_")) {
      const wordId = data.replace("review_easy_", "");
      const words = readWords();
      const target = words.find(w => String(w.id) === String(wordId));
      if (target) {
        target.box = Math.min(5, (target.box || 1) + 1);
        const intervals = [1, 3, 7, 14, 30];
        const days = intervals[target.box - 1];
        target.nextReviewDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
        writeWords(words);
        await this.answerCallback(callbackId, `Ajoyib! So'z ${target.box}-qutiga ko'chirildi (+${days} kun)`);
        await this.sendMessage(chatId, `🎉 <b>"${target.word}"</b> muvaffaqiyatli eslandi! ${target.box}-qutiga o'tkazildi.`);
      }
      return;
    }

    if (data.startsWith("review_hard_")) {
      const wordId = data.replace("review_hard_", "");
      const words = readWords();
      const target = words.find(w => String(w.id) === String(wordId));
      if (target) {
        target.box = 1;
        target.nextReviewDate = new Date().toISOString();
        writeWords(words);
        await this.answerCallback(callbackId, "So'z 1-qutiga qaytarildi, tez orada yana takrorlanadi");
        await this.sendMessage(chatId, `🔄 <b>"${target.word}"</b> 1-qutiga qaytarildi. Ertaga yana takrorlaymiz!`);
      }
      return;
    }

    // 2. Quiz answers
    if (data.startsWith("quiz_")) {
      const parts = data.split("_");
      const isCorrect = parts[2] === "1";
      if (isCorrect) {
        await this.answerCallback(callbackId, "To'g'ri javob! Baraka alla!");
        await this.sendMessage(chatId, "🎉 <b>To'g'ri javob!</b> Ballingiz oshdi! Keyingi test uchun /quiz buyrug'ini bosing.");
      } else {
        await this.answerCallback(callbackId, "Noto'g'ri javob. Yana urinib ko'ring!");
        await this.sendMessage(chatId, "❌ <b>Noto'g'ri.</b> Bu so'zni yana bir bor ko'rib chiqing. Qayta sinash uchun /quiz bosing.");
      }
      return;
    }

    await this.answerCallback(callbackId);
  }

  // Long-polling worker for local testing or server without public domain
  startPolling(intervalMs = 2000) {
    if (!this.isConfigured()) {
      console.log("ℹ️ Telegram bot kaliti (.env TELEGRAM_BOT_TOKEN) topilmadi. Bot faol emas.");
      return;
    }

    this.polling = true;
    console.log("🤖 Telegram Bot Polling ishga tushirildi!");

    const poll = async () => {
      if (!this.polling) return;
      try {
        const res = await fetch(`${this.baseUrl}/getUpdates?offset=${this.lastUpdateId + 1}&timeout=20`);
        const data = await res.json();
        if (data.ok && Array.isArray(data.result)) {
          for (const update of data.result) {
            this.lastUpdateId = Math.max(this.lastUpdateId, update.update_id);
            await this.handleUpdate(update);
          }
        }
      } catch (err) {
        // Polling error (network etc.)
      }
      if (this.polling) {
        setTimeout(poll, intervalMs);
      }
    };

    poll();
  }

  stopPolling() {
    this.polling = false;
  }
}

export const telegramBot = new TelegramBotService();

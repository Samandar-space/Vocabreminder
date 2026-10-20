import express from "express";
import fs from "fs";

const router = express.Router();
const FILE = new URL("./words.json", import.meta.url);

const read = () => {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const write = (data) => {
  try {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Faylga yozishda xatolik:", err);
  }
};

// id ni URL, body yoki query dan oladi
const getId = (req) =>
  String(req.params.id ?? req.body?.id ?? req.query?.id ?? "");

// GET /api/words -> hamma so'zlar (yoki userId bo'yicha)
router.get("/", (req, res) => {
  const { userId } = req.query;
  const words = read();
  if (userId) {
    const filtered = words.filter(w => !w.userId || String(w.userId) === String(userId));
    return res.status(200).json(filtered);
  }
  res.status(200).json(words);
});

// GET /api/words/:id -> bitta so'z
router.get("/:id", (req, res) => {
  const item = read().find((w) => String(w.id) === req.params.id);
  if (!item) return res.status(404).json({ message: "So'z topilmadi" });
  res.status(200).json(item);
});

// POST /api/words -> yangi so'z
router.post("/", (req, res) => {
  const { word, translation } = req.body ?? {};

  if (!word || !translation) {
    return res.status(400).json({ message: "word va translation majburiy" });
  }

  const words = read();
  const newWord = { 
    id: req.body.id || Date.now(),
    box: 1,
    nextReviewDate: new Date().toISOString(),
    reviewCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    ...req.body 
  };
  words.unshift(newWord);
  write(words);
  res.status(201).json(newWord);
});

// POST /api/words/sync -> ommaviy sinxronizatsiya (gibrid rejim uchun)
router.post("/sync", (req, res) => {
  const clientWords = Array.isArray(req.body?.words) ? req.body.words : [];
  const serverWords = read();

  const map = new Map();
  // Serverdagi so'zlarni xaritaga joylash
  serverWords.forEach(w => {
    const key = String(w.id || w.word.toLowerCase());
    map.set(key, w);
  });

  // Client so'zlarini xaritaga qo'shish yoki yangilash
  clientWords.forEach(w => {
    if (!w || !w.word) return;
    const key = String(w.id || w.word.toLowerCase());
    if (!map.has(key)) {
      map.set(key, { ...w, id: w.id || Date.now() });
    }
  });

  const merged = Array.from(map.values());
  write(merged);
  res.status(200).json({ success: true, count: merged.length, words: merged });
});

// PUT /api/words/:id yoki PUT /api/words (id body da)
router.put(["/", "/:id"], (req, res) => {
  const id = getId(req);

  if (!id) {
    return res.status(400).json({
      message: "id kerak: URL ga /api/words/2 deb yoz yoki body ga { \"id\": 2 } qo'sh",
    });
  }

  const words = read();
  const index = words.findIndex((w) => String(w.id) === id);

  if (index === -1) {
    return res.status(404).json({ message: "So'z topilmadi", id });
  }

  words[index] = { ...words[index], ...req.body, id: words[index].id };
  write(words);
  res.status(200).json(words[index]);
});

// DELETE /api/words/:id yoki DELETE /api/words?id=5
router.delete(["/", "/:id"], (req, res) => {
  const id = getId(req);
  const words = read();
  const item = words.find((w) => String(w.id) === id);

  if (!item) {
    return res.status(404).json({ message: "So'z topilmadi", id });
  }

  write(words.filter((w) => String(w.id) !== id));
  res.status(200).json({ message: "So'z o'chirildi", deleted: item });
});

export default router;
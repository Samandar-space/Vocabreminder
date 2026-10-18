import express from "express";
import fs from "fs";

const router = express.Router();
const FILE = new URL("./words.json", import.meta.url);

const read = () => JSON.parse(fs.readFileSync(FILE, "utf-8"));
const write = (data) =>
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

// GET /api/words -> hamma so'zlar
router.get("/", (req, res) => {
  res.status(200).json(read());
});

// GET /api/words/:id -> bitta so'z
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = read().find((w) => w.id === id || String(w.id) === String(req.params.id));

  if (!item) return res.status(404).json({ message: "So'z topilmadi" });
  res.status(200).json(item);
});

router.post("/", (req, res) => {
  const { word, translation } = req.body;

  if (!word || !translation) {
    return res.status(400).json({ message: "word va translation majburiy" });
  }

  const words = read();
  const newWord = { ...req.body, id: Date.now() };
  words.push(newWord);
  write(words);
  res.status(201).json(newWord);
});

// PUT /api/words/:id -> yangilash
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const words = read();
  const index = words.findIndex((w) => w.id === id || String(w.id) === String(req.params.id));

  if (index === -1) return res.status(404).json({ message: "So'z topilmadi" });

  const currentId = words[index].id;
  words[index] = { ...words[index], ...req.body, id: currentId };
  write(words);
  res.status(200).json(words[index]);
});

// DELETE /api/words/:id -> o'chirish
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const words = read();
  const item = words.find((w) => w.id === id || String(w.id) === String(req.params.id));

  if (!item) return res.status(404).json({ message: "So'z topilmadi" });

  write(words.filter((w) => w.id !== id && String(w.id) !== String(req.params.id)));
  res.status(200).json({ message: "So'z o'chirildi", deleted: item });
});

export default router;
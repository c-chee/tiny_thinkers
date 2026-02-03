const express = require("express");
const router = express.Router();

const WORDS_BY_GRADE = {
  k: ["cat", "sun", "hat", "pig", "map", "bug", "bed", "fish", "cup", "jam"],
  1: ["house", "train", "plant", "smile", "chair", "cloud", "sleep", "paper"],
  2: ["turtle", "garden", "rocket", "pencil", "cookie", "window", "basket"],
  3: ["mountain", "whisper", "journey", "captain", "practice", "problem"],
  4: [
    "important",
    "adventure",
    "discover",
    "rectangle",
    "exercise",
    "temperature",
  ],
  5: [
    "responsible",
    "development",
    "environment",
    "independent",
    "communication",
    "opportunity",
  ],
};

function pick10(list) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, 10);
}

function normalizeGrade(raw) {
  if (!raw) return 2;
  const g = String(raw).toLowerCase().trim();
  if (g === "k" || g === "kindergarten") return "k";
  const n = Number(g);
  if ([1, 2, 3, 4, 5].includes(n)) return n;
  return 2;
}

router.get("/spelling/words", (req, res) => {
  const grade = normalizeGrade(req.query.grade || 2);
  const words = WORDS_BY_GRADE[grade] || WORDS_BY_GRADE[2];

  res.json({
    grade,
    level: 1,
    total: 10,
    words: pick10(words),
  });
});

module.exports = router;

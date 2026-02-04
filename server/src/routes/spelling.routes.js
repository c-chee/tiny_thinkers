const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const settingsQueries = require("../db/queries/settings.queries");

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

router.get("/spelling/words", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get saved preferences
    const prefs = await settingsQueries.get(userId);

    // fallback if user has no settings yet
    const gradeRaw = prefs?.grade_level || 2;

    const grade = normalizeGrade(gradeRaw);
    const words = WORDS_BY_GRADE[grade] || WORDS_BY_GRADE[2];

    res.json({
      grade,
      level: 1,
      total: 10,
      words: pick10(words),
    });

  } catch (err) {
    console.error("Spelling words error:", err);
    res.status(500).json({ error: "Failed to load words" });
  }
});


module.exports = router;

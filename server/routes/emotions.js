import express from "express";
import Emotion from "../models/emotion.js";
import { auth } from "../middleware/auth.js";
import Sentiment from "sentiment";

const router = express.Router();
const sentiment = new Sentiment();

// Emoji mapping
const emojiMap = {
  happy: "😊",
  sad: "😢",
  stressed: "😰",
  angry: "😡",
  depressed: "😔",
  neutral: "😐"
};

// Log daily emotion (AI analysis)
router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body; // user free-form input

    // Analyze text
    const analysis = sentiment.analyze(text);
    let emotion = "neutral";

    if (analysis.score > 2) emotion = "happy";
    else if (analysis.score < -2) emotion = "sad";
    else if (text.toLowerCase().includes("stress")) emotion = "stressed";
    else if (text.toLowerCase().includes("angry")) emotion = "angry";
    else if (text.toLowerCase().includes("depress")) emotion = "depressed";

    // Save to DB
    const emotionEntry = new Emotion({
      userId: req.user.id,
      emotion,
      notes: text,
      date: new Date()
    });
    await emotionEntry.save();

    res.status(201).json({ 
      message: "Emotion analyzed and logged", 
      emotion, 
      emoji: emojiMap[emotion] || "❓" 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Weekly review with advice
router.get("/weekly/advice", auth, async (req, res) => {
  try {
    const emotions = await Emotion.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(7);

    // Format each entry with weekday name + emoji
    const weeklyEntries = emotions.map(e => ({
      day: new Date(e.date).toLocaleDateString("en-US", { weekday: "long" }),
      emotion: e.emotion,
      emoji: emojiMap[e.emotion] || "❓"
    }));

    // Count emotions
    const summary = emotions.reduce((acc, e) => {
      acc[e.emotion] = (acc[e.emotion] || 0) + 1;
      return acc;
    }, {});

    // Find dominant emotion
    const dominantEmotion = Object.keys(summary).reduce((a, b) =>
      summary[a] > summary[b] ? a : b
    );

    // Advice mapping
    const adviceMap = {
      happy: "Keep nurturing the activities and people that bring you joy. Consider journaling what made you happy this week.",
      sad: "It’s okay to feel sad. Try reaching out to a friend, practicing self-care, or doing something creative to lift your mood.",
      stressed: "Stress builds up quickly. Consider short breaks, breathing exercises, or organizing tasks to reduce pressure.",
      angry: "Anger often signals unmet needs. Reflect on triggers and try calming techniques like walking or listening to music.",
      depressed: "If you’ve felt depressed often, please consider talking to someone you trust or a mental health professional. Small steps like daily walks or gratitude journaling can help."
    };

    const advice = adviceMap[dominantEmotion] || "Keep reflecting on your emotions and take care of yourself.";

    res.json({ weeklyEntries, summary, dominantEmotion, advice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
import mongoose from "mongoose";

const emotionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  emotion: { type: String, required: true },
  notes: { type: String }
});

const Emotion = mongoose.model("Emotion", emotionSchema);
export default Emotion;
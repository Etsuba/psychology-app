import React, { useState } from "react";
import API from "../api/axiosConfig";

const EmotionForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/emotions", { text });
      alert(`Logged as: ${res.data.emoji} ${res.data.emotion}`);
      setText("");
    } catch (err) {
      alert("Failed to log emotion");
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-purple-100 to-indigo-100">
      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-96 space-y-6 border border-purple-600 hover:shadow-purple-300 transition duration-300"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-purple-900 drop-shadow-md">
          🌸 How are you feeling today?
        </h2>

        {/* Textarea */}
        <textarea
          placeholder="Write a sentence about your mood..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-purple-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400 outline-none shadow-sm"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-2 w-full rounded-xl shadow-md hover:shadow-lg transition duration-300"
        >
          Submit 💌
        </button>
      </form>
    </div>
  );
};

export default EmotionForm;
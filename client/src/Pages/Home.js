export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center">
      
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-serif font-bold text-purple-800 drop-shadow-md">
          🌸 Welcome to Your Emotion Journal
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-md mx-auto">
          A calming space to reflect, track, and grow with your emotions.
        </p>
      </header>

      {/* Emotion Form */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-96 space-y-6 border border-purple-200 hover:shadow-purple-300 transition duration-300">
        <h2 className="text-2xl font-bold text-center text-purple-700">
          How are you feeling today?
        </h2>
        <textarea
          placeholder="Write a sentence about your mood..."
          className="border border-purple-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400 outline-none shadow-sm"
        />
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-4 py-2 w-full rounded-xl shadow-md hover:shadow-lg transition duration-300">
          Submit 💌
        </button>
      </div>
    </div>
  );
}
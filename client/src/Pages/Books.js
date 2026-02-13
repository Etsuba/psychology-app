import React, { useState } from "react";
import axios from "axios";

// Curated Trending Books (static list)
const trendingBooks = [
  {
    title: "The Atomic Habits Workbook",
    author: "James Clear",
    year: 2026,
    cover: "https://covers.openlibrary.org/b/id/10523345-L.jpg",
    description: "A practical workbook to build better habits and break bad ones.",
  },
  {
    title: "The Meaning of Your Life",
    author: "Arthur C. Brooks",
    year: 2026,
    cover: "https://covers.openlibrary.org/b/id/10523346-L.jpg",
    description: "Explores purpose, happiness, and fulfillment through psychology.",
  },
  {
    title: "Secure: The Revolutionary Science of Attachment",
    author: "Amir Levine",
    year: 2026,
    cover: "https://covers.openlibrary.org/b/id/10523347-L.jpg",
    description: "Groundbreaking insights into attachment theory and relationships.",
  },
  {
    title: "Tell Me Where It Hurts",
    author: "Rachel Zoffness, Ph.D",
    year: 2026,
    cover: "https://covers.openlibrary.org/b/id/10523348-L.jpg",
    description: "A compassionate look at chronic pain and psychological healing.",
  },
];

const BooksPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Search books using Google Books API
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:psychology`
      );
      setResults(res.data.items || []);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 p-8">
      <h1 className="text-4xl font-serif font-bold text-purple-800 text-center mb-8">
        📚 Psychology Books
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-10 space-x-2"
      >
        <input
          type="text"
          placeholder="Search psychology books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-purple-300 rounded-xl p-3 w-1/2 focus:ring-2 focus:ring-purple-400 outline-none shadow-sm"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 transition"
        >
          Search
        </button>
      </form>

      {/* Trending Books */}
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Trending Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {trendingBooks.map((book, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-purple-300 transition flex space-x-4"
          >
            {/* Cover */}
            {book.cover && (
              <img
                src={book.cover}
                alt={book.title}
                className="w-24 h-36 object-cover rounded-md shadow-md"
              />
            )}

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-purple-800">{book.title}</h3>
              <p className="text-gray-700">by {book.author}</p>
              <p className="text-sm italic text-gray-500">Release: {book.year}</p>
              <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                {book.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((item) => {
              const info = item.volumeInfo;
              return (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-purple-300 transition flex space-x-4"
                >
                  {/* Book Cover */}
                  {info.imageLinks?.thumbnail && (
                    <img
                      src={info.imageLinks.thumbnail}
                      alt={info.title}
                      className="w-24 h-36 object-cover rounded-md shadow-md"
                    />
                  )}

                  {/* Book Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-purple-800">
                      {info.title}
                    </h3>
                    <p className="text-gray-700">
                      {info.authors?.join(", ") || "Unknown Author"}
                    </p>
                    <p className="text-sm italic text-gray-500">
                      {info.publishedDate || "Unknown Date"}
                    </p>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                      {info.description || "No description available."}
                    </p>
                    {info.previewLink && (
                      <a
                        href={info.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-purple-600 hover:underline text-sm"
                      >
                        Preview →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default BooksPage;
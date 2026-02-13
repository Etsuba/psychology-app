import express from "express";
import Book from "../models/book.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get all psychology books
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new book
router.post("/", auth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
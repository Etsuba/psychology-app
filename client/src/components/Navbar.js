import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex space-x-6">
      <Link to="/">Home</Link>
      <Link to="/tracker">Emotion Tracker</Link>
      <Link to="/report">Weekly Report</Link>
      <Link to="/books">Books</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
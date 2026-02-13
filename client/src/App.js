import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import EmotionTracker from "./Pages/EmotionTracker";
import WeeklyReport from "./Pages/WeeklyReport";
import Books from "./Pages/Books";
import EmotionForm from "./components/EmotionForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tracker" element={<EmotionForm />} />
        <Route path="/report" element={<WeeklyReport />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
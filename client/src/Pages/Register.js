import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input type="text" placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)} className="border p-2 w-full" required />
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
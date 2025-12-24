import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Store/store";
import "./LoginRegister.css";

export function Register() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword)
      return alert("Fill all fields");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      const response = await fetch("http://localhost:3001/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "LOGIN", payload: data.user }); // تسجيل الدخول مباشرة بعد التسجيل
        alert(data.msg || "Account created!");
        navigate("/"); // التوجه للصفحة الرئيسية
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("Server error. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/login"); // العودة لصفحة تسجيل الدخول
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Muyan</h1>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn-register" onClick={handleRegister}>
          Register
        </button>

        <button className="btn-toggle" onClick={handleBack}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

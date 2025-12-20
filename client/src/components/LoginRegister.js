import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Store/store";
import "./LoginRegister.css";

export function LoginRegister() {
  // ✨ استخدمي userDispatch بدل dispatch
  const { userDispatch } = useAppContext();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter email and password");

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // ✅ استخدمي userDispatch
        userDispatch({ type: "LOGIN", payload: data.user });
        alert(data.msg || "Login successful!");
        navigate("/home"); // بعد تسجيل الدخول
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword)
      return alert("Fill all fields");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      const res = await fetch("http://localhost:3001/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.msg || "Account created!");
        setIsRegister(false);
        navigate("/login"); // بعد إنشاء الحساب
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Muyan</h1>
        {isRegister ? <h2>Create Account</h2> : <h2>Welcome Back</h2>}

        {isRegister && (
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegister && (
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {isRegister ? (
          <button className="btn-register" onClick={handleRegister}>
            Register
          </button>
        ) : (
          <button className="btn-login" onClick={handleLogin}>
            Login
          </button>
        )}

        <button
          className="btn-toggle"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "Create Account"}
        </button>
      </div>
    </div>
  );
}

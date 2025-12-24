// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Store/store";
import BottomNav from "./BottomNav";
import Location from "./Loctaion.jsx";
import "./HomePage.css";

export default function HomePage() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setDateTime(now.toLocaleString());
  }, []);

  if (!user) {
    return (
      <div className="homepage">
        <p>Please log in to see the homepage.</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      <h1>Welcome, {user.name}!</h1>

      <div className="homepage-info">
        <div className="info-row">
          <span className="label">Email:</span> <span className="value">{user.email}</span>
        </div>
        {user.phone && (
          <div className="info-row">
            <span className="label">Phone:</span> <span className="value">{user.phone}</span>
          </div>
        )}

        <div className="info-row">
          <span className="label">Date & Time:</span> <span className="value">{dateTime}</span>
        </div>

        <Location />
      </div>

      <BottomNav currentScreen="home" />
    </div>
  );
}

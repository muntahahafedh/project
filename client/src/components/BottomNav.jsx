// src/components/BottomNav.jsx
import React from "react";
import { Home, Briefcase, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = ({ currentScreen }) => {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <button onClick={() => navigate("/home")} className={currentScreen === "home" ? "active" : ""}>
        <Home size={20} />
        <span>Home</span>
      </button>
      <button onClick={() => navigate("/jobs")} className={currentScreen === "jobs" ? "active" : ""}>
        <Briefcase size={20} />
        <span>Jobs</span>
      </button>
      <button onClick={() => navigate("/map")} className={currentScreen === "map" ? "active" : ""}>
        <MapPin size={20} />
        <span>Places</span>
      </button>
      <button onClick={() => navigate("/events")} className={currentScreen === "events" ? "active" : ""}>
        <Calendar size={20} />
        <span>Events</span>
      </button>
    </div>
  );
};

export default BottomNav;

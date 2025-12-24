// src/components/HomePage
import React from "react";
import "./HomePage.css";
import {
  Search,
  Briefcase,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { BottomNav } from "./BottomNav";
import { useAppContext } from "../Store/store";
import { useNavigate } from "react-router-dom";

export function HomePage({ user }) {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate(); // استخدام React Router

  const recommendations = [
    {
      id: 1,
      type: "event",
      title: "Job Fair - Salalah",
      date: "Nov 15, 2025",
      icon: Calendar,
    },
    {
      id: 2,
      type: "place",
      title: "Accessible Café Downtown",
      rating: "4.8 ⭐",
      icon: MapPin,
    },
    {
      id: 3,
      type: "job",
      title: "UI Designer at TechCorp",
      location: "Remote",
      icon: Briefcase,
    },
  ];

  const handleClick = (item) => {
    if (item.type === "job") navigate("/jobs");
    else if (item.type === "place") navigate("/map");
    else if (item.type === "event") navigate("/events");
    else if (item.type === "LoginRegister") navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Muyan </h2>

    
        <div className="search-box">
          <Search className="search-icon" />
          <input type="text" placeholder="Search jobs, places, or events..." />
        </div>
      </div>

      <div className="home-cards">
        {!isLoggedIn && (
          <div className="card" onClick={() => navigate("/login")}>
            <span>Login</span>
          </div>
        )}
        <div className="card" onClick={() => navigate("/jobs")}>
          <Briefcase className="card-icon" />
          <span>Jobs</span>
        </div>
        <div className="card" onClick={() => navigate("/map")}>
          <MapPin className="card-icon" />
          <span>Places</span>
        </div>
        <div className="card" onClick={() => navigate("/events")}>
          <Calendar className="card-icon" />
          <span>Events</span>
        </div>
      </div>

      <div className="recommendations">
        <h3>Recommended for You</h3>
        {recommendations.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className="recommendation-card"
              key={item.id}
              onClick={() => handleClick(item)}
            >
              <Icon className="rec-icon" />
              <div>
                <p>{item.title}</p>
                <p>{item.date || item.location || item.rating}</p>
              </div>
              <ChevronRight className="chevron" />
            </div>
          );
        })}
      </div>

      <BottomNav currentScreen="home" />
    </div>
  );
}

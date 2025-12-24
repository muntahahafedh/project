import React from "react";
import { Home, User, Settings, MapPin } from "lucide-react";
import "./BottomNav.css";
import { useNavigate } from "react-router-dom";

export function BottomNav({ currentScreen }) {
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "map", label: "Map", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavigate = (id) => {
    switch (id) {
      case "home":
        navigate("/home");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "map":
        navigate("/map");
        break;
      case "settings":
        navigate("/settings");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`nav-button ${isActive ? "active" : ""}`}
          >
            <Icon className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

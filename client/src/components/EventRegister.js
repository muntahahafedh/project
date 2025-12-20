import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Store/store";
import "./EventRegister.css";

export function EventRegister() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");
  const [eventId, setEventId] = useState("");

  const events = [
    { id: "1", title: "Inclusive Job Fair - Salalah" },
    { id: "2", title: "Web Accessibility Workshop" },
  ];

  const handleSubmit = async () => {
    if (!eventId || !phone || !age || !gender || !experience)
      return alert("Please fill all fields");
    if (!user?.id || !user?.name) return alert("User not logged in");

    const selectedEvent = events.find(e => e.id === eventId);

    try {
      const res = await fetch("http://localhost:3001/registerEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          phone,
          age,
          gender,
          experience,
          eventId,
          eventTitle: selectedEvent?.title,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event registration successful!");
        setPhone(""); setAge(""); setGender(""); setExperience(""); setEventId("");
        navigate("/settings");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Event registration error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="event-register-page">
      <div className="event-register-container">
        <h1>Register for Event</h1>

        <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />

        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select value={experience} onChange={e => setExperience(e.target.value)}>
          <option value="">Select Experience</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select value={eventId} onChange={e => setEventId(e.target.value)}>
          <option value="">Select Event</option>
          {events.map(ev => (
            <option key={ev.id} value={ev.id}>{ev.title}</option>
          ))}
        </select>

        <button className="btn-register" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

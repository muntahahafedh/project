import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditForm.css";

export function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/events/${eventId}`)
      .then(res => res.json())
      .then(data => setEvent(data.event))
      .catch(err => console.error(err));
  }, [eventId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/events/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    navigate("/settings");
  };

  if (!event) return <p>Loading...</p>;

  return (
    <form className="edit-page" onSubmit={handleUpdate}>
      <h2>Edit Event</h2>
      <input
        placeholder="Name"
        value={event.name}
        onChange={e => setEvent({ ...event, name: e.target.value })}
      />
      <input
        placeholder="Phone"
        value={event.phone}
        onChange={e => setEvent({ ...event, phone: e.target.value })}
      />
      <input
        placeholder="Age"
        type="number"
        value={event.age}
        onChange={e => setEvent({ ...event, age: e.target.value })}
      />
      <select
        value={event.gender}
        onChange={e => setEvent({ ...event, gender: e.target.value })}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        placeholder="Experience"
        value={event.experience}
        onChange={e => setEvent({ ...event, experience: e.target.value })}
      />
      <button type="submit" className="update-btn">Update Event</button>
    </form>
  );
}

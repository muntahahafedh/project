// JobsRegister.js
import React, { useState } from "react";
import { useAppContext } from "../Store/store";
import { useNavigate } from "react-router-dom";
import "./JobsRegister.css";

// قائمة افتراضية تربط العنوان بالشركة والموقع
const jobOptions = {
  "Graphic Designer": { company: "Company XYZ", location: "Location XYZ" },
  "UI/UX Designer": { company: "TechCorp", location: "Remote" },
  "Web Developer": { company: "WebWorks", location: "Muscat" },
};

export function JobsRegister() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");

  // تحديث الشركة والموقع تلقائياً حسب العنوان
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    if (jobOptions[value]) {
      setCompany(jobOptions[value].company);
      setLocation(jobOptions[value].location);
    } else {
      setCompany("");
      setLocation("");
    }
  };

  const handleSubmit = async () => {
    if (!title || !company || !location || !type || !phone) {
      return alert("Please fill all fields");
    }
    if (!user?.id) return alert("User not logged in");

    try {
      const res = await fetch("http://localhost:3001/registerJob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          jobId: Date.now().toString(),
          title,
          company,
          location,
          type,
          phone,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Job registration successful!");
        setTitle("");
        setCompany("");
        setLocation("");
        setType("");
        setPhone("");
        navigate("/settings");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Job registration error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="jobs-register-page">
      <div className="jobs-register-container">
        <h1>Register for Job</h1>

        <select value={title} onChange={handleTitleChange}>
          <option value="">Select Job Title</option>
          {Object.keys(jobOptions).map((job) => (
            <option key={job} value={job}>{job}</option>
          ))}
        </select>

        <input type="text" placeholder="Company" value={company} readOnly />
        <input type="text" placeholder="Location" value={location} readOnly />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="btn-register" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

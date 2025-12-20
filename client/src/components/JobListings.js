import React, { useState } from "react";
import { Accessibility, MapPin, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./JobListings.css";
import { BottomNav } from "./BottomNav";

const categories = ["All", "IT", "Design", "Retail", "Customer Service", "Marketing"];

const jobs = [
  { id: 1, title: "UI/UX Designer", company: "TechCorp", location: "Remote", salary: "$50k - $70k", type: "Full-time", accessible: true, category: "Design" },
  { id: 2, title: "Frontend Developer", company: "WebSolutions Inc.", location: "Muscat, Oman", salary: "$60k - $80k", type: "Full-time", accessible: true, category: "IT" },
  { id: 3, title: "Customer Support Specialist", company: "SupportHub", location: "Salalah, Oman", salary: "$30k - $40k", type: "Part-time", accessible: true, category: "Customer Service" },
  { id: 4, title: "Content Writer", company: "MediaCo", location: "Remote", salary: "$40k - $55k", type: "Full-time", accessible: true, category: "Marketing" },
  { id: 5, title: "Graphic Designer", company: "Creative Studio", location: "Muscat, Oman", salary: "$45k - $60k", type: "Full-time", accessible: true, category: "Design" },
];

export function JobListings({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredJobs =
    selectedCategory === "All"
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);

  const handleJobSelect = (jobId) => {
    navigate(`/jobs-register/${jobId}`);
  };

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Job Opportunities</h1>
        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "category active" : "category"}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="jobs-count">{filteredJobs.length} jobs available</p>

      <div className="jobs-list">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="job-card"
            onClick={() => handleJobSelect(job.id)}
          >
            <div className="job-header">
              <div>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
              </div>
              {job.accessible && <Accessibility className="accessibility-icon" />}
            </div>
            <div className="job-info">
              <span className="job-type">{job.type}</span>
              <span className="job-location"><MapPin /> {job.location}</span>
              <span className="job-salary"><DollarSign /> {job.salary}</span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}

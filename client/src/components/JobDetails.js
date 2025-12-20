import React from "react";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Accessibility,
  Wifi,
  Home,
  Navigation,
} from "lucide-react";
import "./JobDetails.css";

const jobData = {
  1: {
    title: "UI/UX Designer",
    company: "TechCorp",
    image:
      "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxNzQ4ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Remote",
    salary: "$50k - $70k",
    type: "Full-time",
    description:
      "We are looking for a talented UI/UX Designer to join our growing team. You will be responsible for creating intuitive and accessible user interfaces for our web and mobile applications.",
    requirements: [
      "3+ years of experience in UI/UX design",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong understanding of accessibility standards (WCAG)",
      "Portfolio demonstrating design skills",
    ],
    accessibilityBenefits: [
      { icon: Accessibility, label: "Wheelchair accessible office" },
      { icon: Wifi, label: "Remote work option" },
      { icon: Home, label: "Flexible working hours" },
    ],
  },
  // ... يمكن إضافة باقي الوظائف بنفس النمط
};

export function JobDetails({ jobId, onBack, onApply }) {
  const job = jobData[jobId] || jobData[1];

  return (
    <div className="job-container">
      <div className="job-image-container">
        <img src={job.image} alt={job.company} className="job-image" />
        <button className="icon-btn back-btn" onClick={onBack}>
          <ArrowLeft />
        </button>
      </div>

      <div className="job-content">
        <h2 className="job-title">{job.title}</h2>
        <p className="job-company">{job.company}</p>

        <div className="job-info">
          <span className="job-type">{job.type}</span>
          <span className="job-location">
            <MapPin /> {job.location}
          </span>
          <span className="job-salary">
            <DollarSign /> {job.salary}
          </span>
        </div>

        <div className="accessibility-card">
          <p>Accessibility Benefits</p>
          <div className="benefits-list">
            {job.accessibilityBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon">
                    <Icon />
                  </div>
                  <span>{benefit.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="job-section">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="job-section">
          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="job-footer">
        <button className="apply-btn" onClick={onApply}>
          <Navigation /> Apply Now
        </button>
      </div>
    </div>
  );
}

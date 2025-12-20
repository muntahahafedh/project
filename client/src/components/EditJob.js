import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditForm.css";

export function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/jobs/${jobId}`)
      .then(res => res.json())
      .then(data => setJob(data.job))
      .catch(err => console.error(err));
  }, [jobId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/jobs/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    navigate("/settings");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <form className="edit-page" onSubmit={handleUpdate}>
      <h2>Edit Job</h2>
      <input
        placeholder="Title"
        value={job.title}
        onChange={e => setJob({ ...job, title: e.target.value })}
      />
      <input
        placeholder="Company"
        value={job.company}
        onChange={e => setJob({ ...job, company: e.target.value })}
      />
      <input
        placeholder="Location"
        value={job.location}
        onChange={e => setJob({ ...job, location: e.target.value })}
      />
      <input
        placeholder="Type"
        value={job.type}
        onChange={e => setJob({ ...job, type: e.target.value })}
      />
      <input
        placeholder="Phone"
        value={job.phone}
        onChange={e => setJob({ ...job, phone: e.target.value })}
      />
      <button type="submit" className="update-btn">Update Job</button>
    </form>
  );
}

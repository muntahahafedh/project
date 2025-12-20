import React, { useEffect, useState } from "react";
import { useAppContext } from "../Store/store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Edit2 } from "lucide-react";
import avatarImg from "../Images/avatar.png";
import "./Settings.css";

export function Settings() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoadingEvents(false);
      return;
    }
    fetch(`http://localhost:3001/events/user/${user.id}`)
      .then(res => res.json())
      .then(data => setEvents(data.events || []))
      .catch(err => console.error(err))
      .finally(() => setLoadingEvents(false));
  }, [user]);

  useEffect(() => {
    if (!user?.id) {
      setLoadingJobs(false);
      return;
    }
    fetch(`http://localhost:3001/jobs/user/${user.id}`)
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []))
      .catch(err => console.error(err))
      .finally(() => setLoadingJobs(false));
  }, [user]);

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await fetch(`http://localhost:3001/events/${id}`, { method: "DELETE" });
    setEvents(prev => prev.filter(e => e._id !== id));
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    await fetch(`http://localhost:3001/jobs/${id}`, { method: "DELETE" });
    setJobs(prev => prev.filter(j => j._id !== id));
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate("/home")}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Settings</h1>
      </div>

      {/* User Info */}
      <div className="user-info">
        <img src={avatarImg} alt="avatar" className="user-avatar" />
        <div className="user-details">
          {user ? (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      </div>

      {/* Events */}
      <div className="user-events">
        <h3>My Events</h3>
        {loadingEvents ? <p>Loading...</p> : events.length === 0 ? <p>No events registered.</p> :
          <ul>
            {events.map(ev => (
              <li key={ev._id} className="event-card">
                <h4>{ev.eventTitle}</h4>
                <p><strong>Phone:</strong> {ev.phone}</p>
                <p><strong>Age:</strong> {ev.age}</p>
                <p><strong>Gender:</strong> {ev.gender}</p>
                <p><strong>Experience:</strong> {ev.experience}</p>
                <div className="event-actions">
                  <button className="edit-btn" onClick={() => navigate(`/update-event/${ev._id}`)}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteEvent(ev._id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        }
      </div>

      {/* Jobs */}
      <div className="user-jobs">
        <h3>My Job Registrations</h3>
        {loadingJobs ? <p>Loading...</p> : jobs.length === 0 ? <p>No jobs registered.</p> :
          <ul>
            {jobs.map(job => (
              <li key={job._id} className="job-card">
                <h4>{job.title}</h4>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Phone:</strong> {job.phone}</p>
                <div className="job-actions">
                  <button className="edit-btn" onClick={() => navigate(`/update-job/${job._id}`)}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteJob(job._id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

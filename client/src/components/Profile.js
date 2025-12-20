// import React from "react";
// import { useAppContext } from "../Store/store";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react"; // Back icon
// import "./Profile.css";
// import avatarImg from "../Images/avatar.png";

// export function Profile() {
//   const { user, events } = useAppContext();
//   const navigate = useNavigate();

//   // Navigate back to home
//   const handleBack = () => navigate("/home");

//   return (
//     <div className="profile-page">
//       {/* Back button */}
//       <div className="profile-header">
//         <button className="back-btn" onClick={handleBack}>
//           <ArrowLeft size={20} /> Back
//         </button>
//         <h1>My Profile</h1>
//       </div>

//       {/* User info */}
//       <div className="user-info">
//         <img
//           src={avatarImg} // default avatar
//           alt="User Avatar"
//           className="user-avatar"
//         />
//         <div className="user-details">
//           <h2>{user?.name}</h2>
//           <p>{user?.email}</p>
//         </div>
//       </div>

//       {/* User events */}
//       <div className="user-events">
//         <h3>My Events</h3>
//         {events.length === 0 ? (
//           <p>No events registered yet.</p>
//         ) : (
//           <ul>
//             {events.map((ev) => (
//               <li key={ev._id} className="event-card">
//                 <h4>{ev.name}</h4>
//                 <p>
//                   <strong>Phone:</strong> {ev.phone}
//                 </p>
//                 <p>
//                   <strong>Event ID:</strong> {ev.eventId}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {ev.date || "Not set"}
//                 </p>
//                 <p>
//                   <strong>Location:</strong> {ev.location || "Not set"}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../Store/store";
import avatarImg from "../Images/avatar.png";
import "./Profile.css";

export default function Profile() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  // Safety check (not logged in)
  if (!user) {
    return (
      <div className="profile-page">
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate("/home")}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1>Profile</h1>
      </div>

      {/* Avatar */}
      <div className="profile-avatar">
        <img src={avatarImg} alt="User Avatar" />
      </div>

      {/* User Info */}
      <div className="profile-info">
        <div className="info-row">
          <span className="label">Name</span>
          <span className="value">{user.name}</span>
        </div>

        <div className="info-row">
          <span className="label">Email</span>
          <span className="value">{user.email}</span>
        </div>

        {/* Optional phone (future-proof) */}
        {user.phone && (
          <div className="info-row">
            <span className="label">Phone</span>
            <span className="value">{user.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useAppContext } from "../Store/store";
// import avatarImg from "../Images/avatar.png";
// import "./Profile.css";

// export default function Profile() {
//   const { user } = useAppContext();
//   const navigate = useNavigate();

//   // Safety check (not logged in)
//   if (!user) {
//     return (
//       <div className="profile-page">
//         <p>You are not logged in.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-page">
//       {/* Header */}
//       <div className="profile-header">
//         <button className="back-btn" onClick={() => navigate("/home")}>
//           <ArrowLeft size={20} /> Back
//         </button>
//         <h1>Profile</h1>
//       </div>

//       {/* Avatar */}
//       <div className="profile-avatar">
//         <img src={avatarImg} alt="User Avatar" />
//       </div>

//       {/* User Info */}
//       <div className="profile-info">
//         <div className="info-row">
//           <span className="label">Name</span>
//           <span className="value">{user.name}</span>
//         </div>

//         <div className="info-row">
//           <span className="label">Email</span>
//           <span className="value">{user.email}</span>
//         </div>

//         {/* Optional phone (future-proof) */}
//         {user.phone && (
//           <div className="info-row">
//             <span className="label">Phone</span>
//             <span className="value">{user.phone}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../Store/store";
import avatarImg from "../Images/avatar.png";
import "./Profile.css";

export default function Profile() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [location, setLocation] = useState("Fetching location...");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    // Set current date and time
    const now = new Date();
    setDateTime(now.toLocaleString());

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
        },
        () => {
          setLocation("Location not available");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

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

        {/* New Location */}
        <div className="info-row">
          <span className="label">Location</span>
          <span className="value">{location}</span>
        </div>

        {/* New Date & Time */}
        <div className="info-row">
          <span className="label">Date & Time</span>
          <span className="value">{dateTime}</span>
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


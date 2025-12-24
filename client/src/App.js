import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AppProvider } from "./Store/store";

import { SplashScreen } from "./components/SplashScreen";
import { OnboardingCarousel } from "./components/OnboardingCarousel";
import { LoginRegister } from "./components/LoginRegister";
import { Register } from "./components/Register";
import { HomePage } from "./components/HomePage";
import Profile from "./components/Profile";
import { MapView } from "./components/MapView";
import { JobListings } from "./components/JobListings";
import { JobDetails } from "./components/JobDetails";
import { JobsRegister } from "./components/JobsRegister"; 
import EventsList from "./components/EventsList"; 
import { EventDetails } from "./components/EventDetails";
import { Settings } from "./components/Settings";
import { EventRegister } from "./components/EventRegister";
import { EditEvent } from "./components/EditEvent";
import { EditJob } from "./components/EditJob";

// Wrapper لإضافة navigate لـ EventsList
function EventsWrapper() {
  const navigate = useNavigate();
  return <EventsList
    onNavigate={(screen) => navigate(`/${screen}`)}
    onEventSelect={(eventId) => navigate(`/events/${eventId}`)}
  />;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/carousel" element={<OnboardingCarousel />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/jobs-register/:jobId" element={<JobsRegister />} />
          <Route path="/update-job/:jobId" element={<EditJob />} />
          <Route path="/events" element={<EventsWrapper />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/event-register" element={<EventRegister />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/update-event/:eventId" element={<EditEvent />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

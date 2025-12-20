import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Accessibility } from 'lucide-react';
import { ImageWithFallback } from './images/ImageWithFallback';
import './EventDetails.css'; // استيراد CSS

const eventData = {
  1: {
    title: 'Inclusive Job Fair - Salalah',
    image: 'https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    date: 'November 15, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Salalah Convention Center',
    attendees: 150,
    description:
      'Join us for an inclusive job fair featuring companies committed to diversity and accessibility. Meet employers, submit resumes, and participate in on-the-spot interviews. All accessibility needs will be accommodated.',
    highlights: [
      'Meet 20+ inclusive employers',
      'Free resume review sessions',
      'Networking opportunities',
      'Refreshments provided',
    ],
    accessibilityFeatures: [
      'Wheelchair accessible venue',
      'Sign language interpreters available',
      'Accessible parking',
      'Quiet rooms available',
    ],
  },
  2: {
    title: 'Web Accessibility Workshop',
    image: 'https://images.unsplash.com/photo-1758272133542-b3107b947fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    date: 'November 20, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Online (Zoom)',
    attendees: 85,
    description:
      'Learn the fundamentals of web accessibility and how to create inclusive digital experiences. This interactive workshop covers WCAG guidelines and practical implementation.',
    highlights: [
      'Learn WCAG 2.1 standards',
      'Hands-on coding exercises',
      'Certificate of completion',
      'Expert Q&A session',
    ],
    accessibilityFeatures: [
      'Live captions available',
      'Screen reader friendly',
      'Recording provided',
      'Flexible pacing',
    ],
  },
};

export function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = eventData[eventId] || eventData[1];

  return (
    <div className="event-details">
      {/* Header Image + Back Button */}
      <div className="event-header">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="event-image"
        />
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
      </div>

      {/* Event Info */}
      <div className="event-info">
        <h2 className="event-title">{event.title}</h2>

        <div className="event-meta">
          <div><Calendar /> {event.date} • {event.time}</div>
          <div><MapPin /> {event.location}</div>
          <div><Users /> {event.attendees} people registered</div>
        </div>

        <div className="event-about">
          <h3>About This Event</h3>
          <p>{event.description}</p>
        </div>

        <div className="event-highlights">
          <h3>Event Highlights</h3>
          <ul>
            {event.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>

        <div className="event-accessibility">
          <div className="accessibility-header">
            <Accessibility /> <span>Accessibility Features</span>
          </div>
          <ul>
            {event.accessibilityFeatures.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </div>

      {/* Register Button */}
      <div className="register-section">
        <button
          className="register-btn"
          onClick={() => navigate("/event-register")} // هنا التغيير
        >
          Register for Event
        </button>
      </div>
    </div>
  );
}

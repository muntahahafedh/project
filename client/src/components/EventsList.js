import React, { useState } from 'react';
import { Accessibility, Calendar, MapPin, Users } from 'lucide-react';
import { BottomNav } from './BottomNav';
import './EventsList.css';

const filters = ['All', 'Online', 'Offline', 'Upcoming', 'Free'];

const events = [
  {
    id: 1,
    title: 'Inclusive Job Fair - Salalah',
    date: 'November 15, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Salalah Convention Center',
    type: 'Offline',
    isFree: true,
    attendees: 150,
    image: 'https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accessible: true,
  },
  {
    id: 2,
    title: 'Web Accessibility Workshop',
    date: 'November 20, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Online (Zoom)',
    type: 'Online',
    isFree: true,
    attendees: 85,
    accessible: true,
    image: 'https://images.unsplash.com/photo-1758272133542-b3107b947fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];

export default function EventsList({ onNavigate, onEventSelect }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredEvents =
    selectedFilter === 'All'
      ? events
      : selectedFilter === 'Free'
      ? events.filter((e) => e.isFree)
      : events.filter((e) => e.type === selectedFilter);

  return (
    <div className="events-list">
      <div className="events-header">
        <h1>Events & Workshops</h1>
        <div className="events-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={selectedFilter === filter ? 'filter-btn active' : 'filter-btn'}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="events-container">
        <p className="events-count">{filteredEvents.length} events available</p>
        <div className="events-cards">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card" onClick={() => onEventSelect(event.id)}>
              <img src={event.image} alt={event.title} className="event-card-image" />
              <div className="event-card-content">
                <div className="event-card-header">
                  <h3>{event.title}</h3>
                  {event.accessible && <Accessibility className="accessible-icon" />}
                </div>
                <div className="event-card-meta">
                  <div><Calendar /> {event.date} • {event.time}</div>
                  <div><MapPin /> {event.location}</div>
                  <div><Users /> {event.attendees} registered</div>
                </div>
                <div className="event-card-tags">
                  <span className="event-type">{event.type}</span>
                  {event.isFree && <span className="event-free">Free</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}

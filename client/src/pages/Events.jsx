import React from 'react';
import { Link } from 'react-router-dom';
import './Events.css';

const mockEvents = [
  {
    id: 1,
    title: 'Nairobi Tech & Innovation Summit 2026',
    date: 'February 15, 2026',
    location: 'Kenyatta International Convention Centre',
    price: 'KES 2,500 – 8,000',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2070&q=80',
    attendees: 450,
  },
  {
    id: 2,
    title: 'Afrobeat & Amapiano Night',
    date: 'February 28, 2026',
    location: 'K1 Klub House, Westlands',
    price: 'KES 1,200 – 3,500',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2074&q=80',
    attendees: 320,
  },
  {
    id: 3,
    title: 'Nairobi Food & Wine Festival',
    date: 'March 8–9, 2026',
    location: 'Uhuru Gardens Memorial Park',
    price: 'Free entry / VIP KES 4,500',
    image: 'https://images.unsplash.com/photo-1555939594-58056f625634?auto=format&fit=crop&w=2070&q=80',
    attendees: 1200,
  },
  
];

const Events = () => {
  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Discover Events in Nairobi</h1>
        <p>Explore upcoming concerts, festivals, workshops, networking, and more.</p>
      </div>

      <div className="events-filters">
        <input type="text" placeholder="Search events..." className="search-input" />
        <select className="filter-select">
          <option>All Categories</option>
          <option>Music & Concerts</option>
          <option>Tech & Business</option>
          <option>Food & Drinks</option>
          <option>Workshops</option>
          <option>Networking</option>
        </select>
        <select className="filter-select">
          <option>Upcoming</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>Free Events</option>
        </select>
      </div>

      <div className="events-grid">
        {mockEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div
              className="event-image"
              style={{ backgroundImage: `url(${event.image})` }}
            >
              <div className="event-overlay">
                <span className="event-date">{event.date}</span>
              </div>
            </div>
            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-location">{event.location}</p>
              <div className="event-meta">
                <span className="event-price">{event.price}</span>
                <span className="event-attendees">{event.attendees} attending</span>
              </div>
              <Link to={`/events/${event.id}`} className="btn-book">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {mockEvents.length === 0 && (
        <div className="no-events">
          <p>No events found. Check back soon or create your own!</p>
        </div>
      )}
    </div>
  );
};

export default Events;
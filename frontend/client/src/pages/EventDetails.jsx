import React from 'react';
import { Link } from 'react-router-dom';
import './EventDetails.css';

const event = {
  id: 1,
  title: 'Nairobi Tech & Innovation Summit 2026',
  description: 'Join industry leaders, innovators, and entrepreneurs for a day of talks, workshops, and networking focused on Africa\'s tech future. Topics include AI, fintech, blockchain, and sustainable innovation.',
  date: 'February 15, 2026 • 9:00 AM - 6:00 PM',
  location: 'Kenyatta International Convention Centre, Nairobi',
  price: 'KES 2,500 – 8,000',
  organizer: 'TechHub Kenya',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2070&q=80',
  capacity: '500 spots',
  ticketsLeft: '320 available',
};

const EventDetails = () => {
  return (
    <div className="event-details-page">
      <div 
        className="event-hero"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{event.title}</h1>
            <div className="event-quick-info">
              <span>{event.date}</span>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="event-main-content">
        <div className="event-info-grid">
          <div className="event-primary">
            <section className="event-section">
              <h2>About This Event</h2>
              <p>{event.description}</p>
            </section>

            <section className="event-section">
              <h2>Organizer</h2>
              <p className="organizer-name">{event.organizer}</p>
            </section>
          </div>

          <aside className="event-sidebar">
            <div className="ticket-card">
              <h3>Tickets</h3>
              <p className="price-range">{event.price}</p>
              <p className="capacity-info">{event.ticketsLeft} / {event.capacity}</p>
              <button className="btn-book-now">Book Tickets Now</button>
              <p className="secure-note">Secure checkout • Powered by EventHub</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
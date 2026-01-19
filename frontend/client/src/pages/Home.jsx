import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            Discover, Book & Manage <span>Amazing Events</span> in Nairobi
          </h1>
          <p>
            From concerts and festivals to workshops and networking — find your next experience in the heart of Kenya's vibrant capital.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="btn primary">Browse Events</Link>
            <Link to="/create-event" className="btn secondary">Create Event</Link>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
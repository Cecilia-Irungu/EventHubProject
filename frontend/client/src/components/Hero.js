import React from 'react';

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="logo">EventHub.com</div>

        <h1 className="main-title">
          The Leading Pan-African<br />
          Commerce <span className="highlight">Partner</span> for<br />
          Live Entertainment and<br />
          <span className="highlight">Sports</span>
        </h1>

        <p className="subtitle">
          We're building the largest live entertainment company in Africa by providing one<br />
          trusted platform to manage and scale events across the continent.
        </p>

        <div className="btn-group">
          <a href="#" className="btn btn-primary">Learn More</a>
          <a href="#" className="btn btn-outline">Explore Events</a>
        </div>
      </div>

      {/* Decorative bottom bar */}
      <div className="money-bar">
        <div className="money-text">THE CHALLENGE</div>
      </div>
    </div>
  );
};

export default Hero;

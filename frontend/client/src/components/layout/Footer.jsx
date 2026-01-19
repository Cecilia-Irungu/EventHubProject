import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} EventHub. All rights reserved.</p>
        <p>Made with ❤️ in Nairobi</p>
      </div>
    </footer>
  );
};

export default Footer;
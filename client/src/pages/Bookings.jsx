import React from 'react';
import { Link } from 'react-router-dom';
import './Bookings.css';


const bookings = [
  {
    id: 1,
    eventTitle: 'Afrobeat & Amapiano Night',
    date: 'Feb 28, 2026',
    ticketType: 'VIP',
    price: 'KES 3,500',
    status: 'Confirmed',
    qrCode: true, 
  },
  {
    id: 2,
    eventTitle: 'Nairobi Tech Summit',
    date: 'Feb 15, 2026',
    ticketType: 'General',
    price: 'KES 2,500',
    status: 'Confirmed',
    qrCode: true,
  },
];

const Bookings = () => {
  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>
      <p>View and manage your upcoming event tickets.</p>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't booked any events yet.</p>
          <Link to="/events" className="btn-browse">Browse Events</Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.eventTitle}</h3>
                <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
              </div>
              <div className="booking-details">
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Ticket:</strong> {booking.ticketType} – {booking.price}</p>
              </div>
              <div className="booking-actions">
                <button className="btn-view">View Ticket</button>
                <button className="btn-cancel">Cancel Booking</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
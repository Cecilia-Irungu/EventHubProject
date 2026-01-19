import React from 'react';
import { Link } from 'react-router-dom';
import './ManageEvents.css';  

const myEvents = [
  { id: 1, title: 'Nairobi Startup Mixer', date: 'March 20, 2026', status: 'Upcoming', attendees: 48 },
  { id: 2, title: 'Coding Bootcamp Series', date: 'April 5–10, 2026', status: 'Draft', attendees: 0 },
  { id: 3, title: 'Women in Tech Conference', date: 'May 12, 2026', status: 'Upcoming', attendees: 89 },
];

const ManageEvents = () => {
  return (
    <div className="manage-events-page">
      <div className="manage-header">
        <h1>My Events</h1>
        <Link to="/create-event" className="btn-create">
          + Create New Event
        </Link>
      </div>

      {myEvents.length === 0 ? (
        <div className="no-events">
          <p>You haven't created any events yet.</p>
          <Link to="/create-event" className="btn-create">Start Creating</Link>
        </div>
      ) : (
        <div className="events-table">
          <div className="table-header">
            <span>Event</span>
            <span>Date</span>
            <span>Status</span>
            <span>Attendees</span>
            <span>Actions</span>
          </div>

          {myEvents.map((event) => (
            <div key={event.id} className="table-row">
              <div className="event-name">{event.title}</div>
              <div>{event.date}</div>
              <div className={`status ${event.status.toLowerCase()}`}>
                {event.status}
              </div>
              <div>{event.attendees}</div>
              <div className="actions">
                <Link to={`/events/${event.id}/edit`} className="btn-edit">
                  Edit
                </Link>
                <button className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
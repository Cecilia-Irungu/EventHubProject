import { useEffect, useState } from "react";
import { fetchEvents } from "../api";
import { Link } from "react-router-dom";

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <div>
      <h1>Events</h1>
      {events.map((event) => (
        <div key={event.id}>
          <Link to={`/events/${event.id}`}>
            <h2>{event.title}</h2>
          </Link>
          <p>{event.description}</p>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}

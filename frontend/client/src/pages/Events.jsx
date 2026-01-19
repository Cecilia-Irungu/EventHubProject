import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await API.get("/events");
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map(event => (
          <div key={event.id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
            <Link to={`/events/${event.id}`} className="text-blue-500 mt-2 block">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;

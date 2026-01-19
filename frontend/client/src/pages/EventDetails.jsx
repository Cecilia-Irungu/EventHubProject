import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await API.get("/events");
      setEvent(res.data.find(e => e.id === parseInt(id)));
    };
    const fetchFeedback = async () => {
      const res = await API.get(`/feedback/${id}`);
      setFeedbacks(res.data);
    };
    fetchEvent();
    fetchFeedback();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p className="text-gray-500">{new Date(event.date).toLocaleString()}</p>
      <h2 className="text-2xl mt-4">Feedback</h2>
      {feedbacks.map(f => (
        <div key={f.id} className="border p-2 rounded my-2">
          <p>{f.content}</p>
          <p className="text-sm text-gray-500">Rating: {f.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default EventDetails;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventById, fetchEventFeedback } from "../api";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchEventById(id).then(setEvent);
    fetchEventFeedback(id).then(setFeedback);
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>

      <h2>Feedback</h2>
      {feedback.map((f) => (
        <div key={f.id}>
          <p>Rating: {f.rating}</p>
          <p>Comment: {f.comment}</p>
        </div>
      ))}
    </div>
  );
}

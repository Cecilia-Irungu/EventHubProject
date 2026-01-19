import { useState } from "react";
import API from "../api/api";

const Feedback = () => {
  const [eventId, setEventId] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/feedback", { content, rating }, { params: { event_id: eventId } });
      alert("Feedback submitted!");
      setContent("");
      setRating(1);
      setEventId("");
    } catch (err) {
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Submit Feedback</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="number"
          placeholder="Event ID"
          value={eventId}
          onChange={e => setEventId(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Feedback content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating"
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;

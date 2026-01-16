import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsList from "./components/EventsList";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";
import CreateFeedback from "./components/CreateFeedback";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/events">Events</Link> |{" "}
        <Link to="/create-event">Create Event</Link> |{" "}
        <Link to="/create-feedback">Leave Feedback</Link>
      </nav>
      <Routes>
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-feedback" element={<CreateFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;

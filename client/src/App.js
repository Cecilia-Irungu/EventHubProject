import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsList from "./components/EventsList";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/events">Events</Link> | <Link to="/create-event">Create Event</Link>
      </nav>
      <Routes>
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;

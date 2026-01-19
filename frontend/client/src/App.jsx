import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Feedback from "./pages/Feedback";
import Tags from "./pages/Tags";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route
          path="/events"
          element={<ProtectedRoute><Events /></ProtectedRoute>}
        />
        <Route
          path="/events/:id"
          element={<ProtectedRoute><EventDetails /></ProtectedRoute>}
        />
        <Route
          path="/feedback"
          element={<ProtectedRoute><Feedback /></ProtectedRoute>}
        />
        <Route
          path="/tags"
          element={<ProtectedRoute><Tags /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;

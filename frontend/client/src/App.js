import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import CreateEvents from "./pages/CreateEvents";
import ManageEvents from "./pages/ManageEvents";
import DashBoardOverview from "./pages/DashBoardOverview";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashBoardOverview />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/create-event" element={<CreateEvents />} />
              <Route path="/manage-events" element={<ManageEvents />} />
            </Route>

            {/* FALLBACK */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: "center", padding: "100px" }}>
                  <h1>404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

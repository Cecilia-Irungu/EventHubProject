import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/profile";
import ManageEvents from "./pages/ManageEvents";
import Bookings from "./pages/Bookings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/event/:id" element={<EventDetails/>}/>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute/>}>
                    <Route path="/create-event" element={<CreateEvent/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/manage-events" element={<ManageEvents/>}/>
                    <Route path="/bookings" element={<Bookings/>}/>
                </Route>
            </Routes>
        </Router>
    );
}   

export default App;
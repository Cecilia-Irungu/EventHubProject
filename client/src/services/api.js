import axios from "axios";

// Base API URL
const API_URL = "http://127.0.0.1:8000";


const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT token to headers 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // stored after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- AUTH ----------------
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const resetPassword = (email) => api.post("/auth/reset-password", { email });

// ---------------- EVENTS ----------------
export const getEvents = () => api.get("/events");
export const getEventById = (id) => api.get(`/events/${id}`);
export const createEvent = (data) => api.post("/events", data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// ---------------- BOOKINGS ----------------
export const getMyBookings = () => api.get("/bookings/me");
export const createBooking = (data) => api.post("/bookings", data);
export const cancelBooking = (id) => api.delete(`/bookings/${id}`);

// ---------------- PROFILE ----------------
export const getProfile = () => api.get("/users/me");
export const updateProfile = (data) => api.put("/users/me", data);

export default api;

const BASE_URL = "http://127.0.0.1:5555";

export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}/events`);
  return await res.json();
}

export async function fetchEventById(id) {
  const res = await fetch(`${BASE_URL}/events/${id}`);
  return await res.json();
}

export async function createEvent(eventData) {
  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return await res.json();
}

export async function fetchEventFeedback(eventId) {
  const res = await fetch(`${BASE_URL}/events/${eventId}/feedback`);
  return await res.json();
}

export async function createFeedback(feedbackData) {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedbackData),
  });
  return await res.json();
}

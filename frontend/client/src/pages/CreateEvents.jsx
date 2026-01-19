import React, { useState } from 'react';
import './CreateEvents.css';

const CreateEvents = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    capacity: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
  };

  return (
    <div className="create-event-page">
      <div className="create-header">
        <h1>Create New Event</h1>
        <p>Fill in the details to get your event live in Nairobi.</p>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        <section className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Nairobi Tech Summit 2026"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Tell attendees what to expect..."
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Date & Location</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Kenyatta Convention Centre, Nairobi"
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Tickets & Capacity</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Price Range (KES)</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 2,500 – 8,000"
              />
            </div>
            <div className="form-group">
              <label>Max Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 500"
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Event Image</h2>
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="event-image"
            />
            <label htmlFor="event-image" className="upload-label">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <span>Upload Event Poster (Click or Drag)</span>
              )}
            </label>
          </div>
        </section>

        <button type="submit" className="btn-submit">
          Publish Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;
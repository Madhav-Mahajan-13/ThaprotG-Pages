import React, { useState } from "react"
import "../../styling/admin/EventForm.css"

const EventForm = ({ onSubmit }) => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    imageLink: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(eventData)
    setEventData({ name: "", description: "", imageLink: "" })
  }

  return (
    <div className="event-form">
      <h2>Post New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Name:</label>
          <input type="text" id="name" name="name" value={eventData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="imageLink">Image Link:</label>
          <input
            type="url"
            id="imageLink"
            name="imageLink"
            value={eventData.imageLink}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Post Event</button>
      </form>
    </div>
  )
}

export default EventForm


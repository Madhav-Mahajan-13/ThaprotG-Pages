import { useState } from "react";

export default function DynamicForm() {

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-10 md:p-16 md:mt-12 bg-white shadow-2xl rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title Field */}
        <div>
          <label className="block font-medium">Title:</label>
          <input type="text" className="p-2 border border-gray-300 rounded w-full" placeholder="Event Title" required />
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium">Description:</label>
          <textarea className="p-2 border border-gray-300 rounded w-full" placeholder="Event Description" required></textarea>
        </div>

        {/* Image Upload Field */}
        <div>
          <label className="block font-medium">Upload Image:</label>
          <input type="file" accept="image/*" className="p-2 border border-gray-300 rounded w-full" required />
        </div>

        {/* PDF Upload Field */}
        <div>
          <label className="block font-medium">Add Link</label>
          <input type="text" className="p-2 border border-gray-300 rounded w-full" placeholder="Useful Link" required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Add Event
        </button>
      </form>
    </div>
  );
}

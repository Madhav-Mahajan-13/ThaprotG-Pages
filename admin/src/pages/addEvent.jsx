/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { MyContext } from "../context/myContext";
import { toast, ToastContainer } from "react-toastify";

export default function DynamicForm() {

  const { backendHost, toastOptions } = useContext(MyContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", e.target.title.value);
      formData.append("event_description", e.target.event_description.value);
      formData.append("image", e.target.image.files[0]);
      formData.append("link", e.target.link.value);
      formData.append("status", e.target.check.checked ? "active" : "suspended");

      const res = await fetch(backendHost + "/api/admin/createEvent", {
        method: "POST",
        body: formData,
        "credentials" : 'include'
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        toast.success("Added Event Successfully", toastOptions);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-10 md:p-16 md:mt-12 bg-white shadow-2xl rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            name="title"
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Event Title"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            name="event_description"
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Event Description"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Add Link</label>
          <input
            type="text"
            name="link"
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Useful Link"
            required
          />
        </div>

        <div className="flex gap-x-1 items-center">
          <input
            type="checkbox"
            className="p-2 border border-gray-300 rounded"
            name="check"
          />
          <label>Active</label>
        </div>

        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Add Event
        </button>
      </form>
    </div>
  );
}

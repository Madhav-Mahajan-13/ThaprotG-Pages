/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { MyContext } from "../context/myContext";
import { toast, ToastContainer } from "react-toastify";

export default function DynamicForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(false); // For checkbox

  const { backendHost, toastOptions } = useContext(MyContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("event_description", description);
      formData.append("image", image);
      formData.append("link", link);
      formData.append("status", isActive ? "active" : "suspended"); // Using state for checkbox

      const res = await fetch(backendHost + "/api/admin/createEvent", {
        method: "POST",
        body: formData,
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
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Event Title"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Add Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Useful Link"
            required
          />
        </div>

        <div className="flex gap-x-1 items-center">
          <input
            type="checkbox"
            className="p-2 border border-gray-300 rounded"
            id="check"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
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

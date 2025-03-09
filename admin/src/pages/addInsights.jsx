import { useContext } from "react";
import { MyContext } from "../context/myContext";
import { toast } from "react-toastify";

export default function InsightForm() {
  const { backendHost, toastOptions } = useContext(MyContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("tag", e.target.tag.value);
      formData.append("description", e.target.description.value);
      
      for (let i = 0; i < e.target.images.files.length && i < 10; i++) {
        formData.append("image", e.target.images.files[i]);
      }

      const res = await fetch(backendHost + "/api/admin/addInsight", {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        toast.success("Added Insight Successfully", toastOptions);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-10 md:p-16 md:mt-12 bg-white shadow-2xl rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Insight</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Tag:</label>
          <input
            type="text"
            name="tag"
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Insight Tag"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            name="description"
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Insight Description"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Upload Images (Up to 10):</label>
          <input
            type="file"
            accept="image/*"
            name="images"
            className="p-2 border border-gray-300 rounded w-full"
            multiple
            required
          />
        </div>

        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Add Insight
        </button>
      </form>
    </div>
  );
}
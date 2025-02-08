import { useState } from "react";

export default function DynamicForm() {
  const [fields, setFields] = useState([]);

  // Add a new dynamic field
  const addField = () => {
    setFields([...fields, { id: Date.now(), name: "" }]);
  };

  // Remove a dynamic field
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Handle dynamic field changes
  const handleFieldChange = (id, value) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, name: value } : field)));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", fields);
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
          <label className="block font-medium">Upload PDF:</label>
          <input type="file" accept=".pdf" className="p-2 border border-gray-300 rounded w-full" required />
        </div>

        {/* Dynamic Fields */}
        <h3 className="text-lg font-semibold mt-4">Additional Fields</h3>
        {fields.map((field) => (
          <div key={field.id} className="flex items-center space-x-2">
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder="Custom Field"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Add Field Button */}
        <button
          type="button"
          onClick={addField}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          ➕ Add Custom Field
        </button>

        {/* Submit Button */}
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Submit Form
        </button>
      </form>
    </div>
  );
}

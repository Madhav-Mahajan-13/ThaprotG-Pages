import { useState } from "react";

export default function Addevent() {
  const [fields, setFields] = useState([{ id: 1, name: "" }]);

  // Add a new field
  const addField = () => {
    setFields([...fields, { id: Date.now(), name: "" }]);
  };

  // Remove a field
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Handle input change
  const handleChange = (id, value) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, name: value } : field
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", fields);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-2xl rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Event Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2">
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={`Field ${index + 1}`}
              className="p-2 border border-gray-300 rounded w-full"
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="p-2 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          ➕ Add Field
        </button>

        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Submit Form
        </button>
      </form>
    </div>
  );
}

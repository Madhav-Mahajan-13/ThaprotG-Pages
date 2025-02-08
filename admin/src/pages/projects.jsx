const data = [
  { id: 1, name: "Alice", age: 25, city: "New York" },
  { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
];

export default function Projects() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto border-collapse border border-gray-400 w-full text-left mx-auto my-24 md:my-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
            <th className="border p-2">City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.id} className="hover:bg-gray-100">
              <td className="border p-2">{person.id}</td>
              <td className="border p-2">{person.name}</td>
              <td className="border p-2">{person.age}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
              <td className="border p-2">{person.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

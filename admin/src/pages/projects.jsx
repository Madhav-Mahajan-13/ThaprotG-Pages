const data = [
    {
        "project_id": "49998a73-f62e-44a3-8e64-c97c12a2b399",
        "user_id": "0237552f-1a66-4a7d-968e-74f5e5aee00d",
        "title": "Freight Logistics Database",
        "description": "create some that  glj;slj",
        "open_until": "2025-01-28T18:30:00.000Z",
        "status": "pending",
        "pushed_to_website": false,
        "created_at": "2025-01-25T22:14:11.945Z",
        "technology": [
          "webdev"
        ],
        "image_path": "img_1737843251940.jpg",
        "openings": 2,
        "pdf_path": "pdf_1737843251938.pdf",
        "first_name": "David",
        "last_name": "Smith"
      },
      {
        "project_id": "e77a7643-5834-4af8-b2ac-a3e5b432267c",
        "user_id": "0237552f-1a66-4a7d-968e-74f5e5aee00d",
        "title": "Freight Logistics Database",
        "description": "create some that  glj;slj",
        "open_until": "2025-01-28T18:30:00.000Z",
        "status": "pending",
        "pushed_to_website": false,
        "created_at": "2025-01-25T22:16:55.401Z",
        "technology": [
          "webdev"
        ],
        "image_path": "img_1737843415395.jpg",
        "openings": 2,
        "pdf_path": "pdf_1737843415393.pdf",
        "first_name": "David",
        "last_name": "Smith"
      },
      {
        "project_id": "aefbc4d2-6eef-416a-b507-24447c80d9fb",
        "user_id": "0237552f-1a66-4a7d-968e-74f5e5aee00d",
        "title": "Freight Logistics Database",
        "description": "create some that  glj;slj",
        "open_until": "2025-01-28T18:30:00.000Z",
        "status": "pending",
        "pushed_to_website": false,
        "created_at": "2025-01-25T22:19:42.713Z",
        "technology": [
          "webdev"
        ],
        "image_path": "img_1737843582707.jpg",
        "openings": 2,
        "pdf_path": "pdf_1737843582705.pdf",
        "first_name": "David",
        "last_name": "Smith"
      }
];

export default function Projects() {
    const backendHost = 'http://localhost:5000';
  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto border-collapse border border-gray-400 w-1/2 text-left mx-auto my-24 md:my-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">project_id</th>
            <th className="border p-2">user_id</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">title</th>
            <th className="border p-2">description</th>
            <th className="border p-2">open_until</th>
            <th className="border p-2">status</th>
            <th className="border p-2">created_at</th>
            <th className="border p-2">technologies</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Openings</th>
            <th className="border p-2">PDF</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.id} className="hover:bg-gray-100">
              <td className="border p-2">{person.project_id}</td>
              <td className="border p-2">{person.user_id}</td>
              <td className="border p-2">{person.first_name + person.last_name}</td>
              <td className="border p-2">{person.title}</td>
              <td className="border p-2">{person.description}</td>
              <td className="border p-2">{person.open_until}</td>
              <td className="border p-2">{person.status}</td>
              <td className="border p-2">{person.created_at}</td>
              <td className="border p-2">{person.technologies}</td>
              <td className="border p-2">
                <a href={backendHost + '/' + person.image_path}>
                    Click to Open
                </a>
              </td>
              <td className="border p-2">{person.openings}</td>
              <td className="border p-2">
                <a href={backendHost + '/' + person.pdf_path}>
                    Click to Open
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

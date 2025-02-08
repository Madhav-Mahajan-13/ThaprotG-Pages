const data = [
    {
        "project_id": "f078ced0-498d-4380-828e-55cf420adfa3",
        "user_id": "2544bbab-16d4-473f-8b1a-26dca6a659b7",
        "title": "skdjfhsd",
        "description": "wlwifjwlksdf",
        "open_until": "2025-02-20T18:30:00.000Z",
        "status": "pending",
        "pushed_to_website": false,
        "created_at": "2025-02-08T13:07:56.743Z",
        "technology": [
          "MERN"
        ],
        "image_path": "uploads/img/img_1739020076737.png",
        "openings": 2,
        "pdf_path": "uploads/pdf/pdf_1739020076736.pdf",
        "first_name": "Indra",
        "last_name": "Mohan"
      },
      {
        "project_id": "a874ec6f-e3bb-4155-82b6-23d652df8d8b",
        "user_id": "2544bbab-16d4-473f-8b1a-26dca6a659b7",
        "title": "dgdfgsd",
        "description": "weolifhsdkjfb",
        "open_until": "2025-02-25T18:30:00.000Z",
        "status": "pending",
        "pushed_to_website": false,
        "created_at": "2025-02-08T13:08:16.133Z",
        "technology": [
          "lfjsdkf"
        ],
        "image_path": "uploads/img/null",
        "openings": 5,
        "pdf_path": "uploads/pdf/null",
        "first_name": "Indra",
        "last_name": "Mohan"
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
              <td className="border p-2">{person.first_name + " " + person.last_name}</td>
              <td className="border p-2">{person.title}</td>
              <td className="border p-2">{person.description}</td>
              <td className="border p-2">{person.open_until}</td>
              <td className="border p-2">{person.status}</td>
              <td className="border p-2">{person.created_at}</td>
              <td className="border p-2">{person.technologies}</td>
              <td className="border p-2">
              {person.pdf_path != 'null' && <a href={backendHost + '/' + person.image_path}>Click to Open</a>}
              {person.pdf_path == 'null' && "Image not available"}
              </td>
              <td className="border p-2">{person.openings}</td>
              <td className="border p-2">
                    {person.pdf_path != 'null' && <a href={backendHost + '/' + person.pdf_path}>Click to Open</a>}
                    {person.pdf_path == 'null' && "PDF not available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

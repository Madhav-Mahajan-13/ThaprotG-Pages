const data = [
    {
        "project_id": "2bea5bdf-ce1d-4a63-9534-9670fe2a6ec3",
        "user_id": "2544bbab-16d4-473f-8b1a-26dca6a659b7",
        "title": "dfgerfgdfg",
        "description": "ertertgerdfg",
        "open_until": "2025-02-24T18:30:00.000Z",
        "status": "pending",
        "pushed_to_website": false,
        "created_at": "2025-02-08T13:24:10.499Z",
        "technology": [
          "redgdfg"
        ],
        "image_path": "uploads/images/img_1739021050494.png",
        "openings": 2,
        "pdf_path": "uploads/pdfs/pdf_1739021050493.pdf",
        "first_name": "Indra",
        "last_name": "Mohan"
      },
      {
        "project_id": "4f03aff4-a745-45ec-9f3e-e25521217107",
        "user_id": "2544bbab-16d4-473f-8b1a-26dca6a659b7",
        "title": "gergdfg",
        "description": "tyrthgfh",
        "open_until": "2025-02-12T18:30:00.000Z",
        "status": "pending",
        "pushed_to_website": false,
        "created_at": "2025-02-08T13:24:34.862Z",
        "technology": [
          "gdfg"
        ],
        "image_path": "uploads/images/img_1739021074849.png",
        "openings": 2,
        "pdf_path": "uploads/pdfs/pdf_1739021074848.pdf",
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

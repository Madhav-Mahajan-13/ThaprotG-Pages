/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { MyContext } from "../context/myContext";
import { useEffect } from "react";
import {toast,ToastContainer} from 'react-toastify';

export default function Projects() {
    const {backendHost,approved_projects,setProjects,toastOptions} = useContext(MyContext);

    useEffect(() => {
      const API_CALL = async () => {
          const res = await fetch(backendHost + '/api/admin/projects_approved',{}) // ADD AUTH HEADERS LATER

          const data = await res.json();
          if(data.success){
            if(data.data){
              setProjects(data.data);
            }
            else{
              toast("NO APPROVED PROJECTS",toastOptions)
            }
          }
          else{
            toast.error(data.message,toastOptions);
            return;
          }
      }

      API_CALL();
    },[])

  return (
    <div className="overflow-x-auto w-full">
      <ToastContainer/>
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
          {approved_projects && approved_projects.map((project) => (
            <tr key={project.project_id} className="hover:bg-gray-100">
              <td className="border p-2">{project.project_id}</td>
              <td className="border p-2">{project.user_id}</td>
              <td className="border p-2">{project.first_name + " " + project.last_name}</td>
              <td className="border p-2">{project.title}</td>
              <td className="border p-2">{project.description}</td>
              <td className="border p-2">{project.open_until}</td>
              <td className="border p-2">{project.status}</td>
              <td className="border p-2">{project.created_at}</td>
              <td className="border p-2">{project.technologies}</td>
              <td className="border p-2">
              {project.pdf_path != 'null' && <a href={backendHost + '/' + project.image_path}>Click to Open</a>}
              {project.pdf_path == 'null' && "Image not available"}
              </td>
              <td className="border p-2">{project.openings}</td>
              <td className="border p-2">
                    {project.pdf_path != 'null' && <a href={backendHost + '/' + project.pdf_path}>Click to Open</a>}
                    {project.pdf_path == 'null' && "PDF not available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

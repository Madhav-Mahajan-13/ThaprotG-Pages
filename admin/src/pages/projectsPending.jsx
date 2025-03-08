/* eslint-disable no-unused-vars */
import React from "react";
import { useContext,useState } from "react";
import { MyContext } from "../context/myContext";
import { useEffect } from "react";
import {toast,ToastContainer} from 'react-toastify';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import tw from 'tailwind-styled-components'

const Input = tw.input`
  border-2
  border-black
  px-2
  focus:outline-0
  rounded-sm
  w-full
`

export default function ProjectsPending() {
    const {backendHost,pending_projects,setPendingProjects,toastOptions} = useContext(MyContext);
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        tech: "",
        openings: "",
      });
    const [dept,setDept] = useState('All');
    const [filtered_projects, setFilteredProjects] = useState(pending_projects);

    const handleClick = async (e,project_id,action) => {
        e.preventDefault();
        try {
            const res = await fetch(backendHost + '/api/admin/changestatus',{
                method:"POST",
                body:JSON.stringify({
                    'project_id' : project_id, 
                    'status' : action == 'approve' ? "approved" : "denied"
                }),
                headers:{
                  "Content-Type":"application/json"
                },
                credentials : "include"
            })

            const data = await res.json();
            
            if(!data.success){
                toast.error(data.message,toastOptions);
            }
            else{
                toast.success("Project " + (action == 'approve' ? "approved " : "denied ") + "successfully");
                let rem_projects = pending_projects.filter(item => item.project_id != project_id);
                setPendingProjects(rem_projects);
            }

        } catch (e) {
            toast.error(e.message,toastOptions);        
        }

    }

    useEffect(() => {
      const API_CALL = async () => {
          const res = await fetch(backendHost + '/api/admin/projects_pending',{
          credentials : "include"
        }) // ADD AUTH HEADERS LATER

          const data = await res.json();
          if(data.success){
            if(data.data){
              setPendingProjects(data.data);
            }
            else{
              toast("NO PENDING PROJECTS",toastOptions)
            }
          }
          else{
            toast.error(data.message,toastOptions);
            return;
          }
      }

      API_CALL();
    },[])

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
    
      useEffect(() => {
        const filtered = pending_projects.filter((project) => {
          return (
            (formData.name == "" ||
              (project.first_name + " " + project.last_name)
                .toLowerCase()
                .includes(formData.name.toLowerCase())) &&
            (formData.title == "" ||
              project.title.toLowerCase().includes(formData.title.toLowerCase())) &&
            (formData.tech == "" ||
              project.technology
                .join("")
                .toLowerCase()
                .includes(formData.tech.toLowerCase())) &&
            (formData.openings == "" || project.openings == formData.openings)
            &&
            (dept == 'All' || project.department == dept)
          );
        });
    
        setFilteredProjects(filtered);
      }, [pending_projects, formData,dept]);

  return (
    <div className="flex flex-col overflow-auto">
    <div className="flex flex-row items-center justify-center mt-24 md:mt-5">
        <form className="flex flex-col md:flex-row gap-x-2 gap-y-3">
          <select value={dept} onChange={(e) => {setDept(e.target.value)}} className='border-2 px-2' >
            <option value='All'>All Dept.</option>
            <option value='CSED'>CSED</option>
            <option value='MED'>MED</option>
            <option value='ECED'>ECED</option>
            <option value='CIVIL'>CIVIL</option>
            <option value='BIO-TECH'>BIO-TECH</option>
            <option value='MBA'>MBA</option>
            <option value='LIB-ARTS'>LIB-ARTS</option>
            <option value='CHEMICAL'>CHEMICAL</option>
          </select>
            <Input type="text" placeholder="Name" id='name' value={formData.name} onChange={handleChange}  />
            <Input type="text" placeholder="Title" id='title' value={formData.title} onChange={handleChange} />
            <Input type="text" placeholder="Technologies" id='tech' value={formData.tech} onChange={handleChange} />
            <Input type="number" placeholder="Openings" id='openings' value={formData.openings} onChange={handleChange} />
        </form>
      </div>
    <div className="overflow-x-auto w-full">
      <table className="table-auto border-collapse border border-gray-400 w-1/2 text-left mx-auto my-24 md:my-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Action</th>
            <th className="border p-2">project_id</th>
            <th className="border p-2">user_id</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">title</th>
            <th className="border p-2">description</th>
            <th className="border p-2">department</th>
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
          {filtered_projects && filtered_projects.map((project) => (
            <tr key={project.project_id} className="hover:bg-gray-100">
              <td className="border p-2">
                <div className="flex flex-row items-center gap-x-3">
                    <TiTick size={50} onClick={(e) => { handleClick(e,project.project_id,'approve') }}/>
                    <ImCross size={25} onClick={(e) => { handleClick(e,project.project_id,'deny') }}/>
                </div>
              </td>
              <td className="border p-2">{project.project_id}</td>
              <td className="border p-2">{project.user_id}</td>
              <td className="border p-2">{project.first_name + " " + project.last_name}</td>
              <td className="border p-2">{project.title}</td>
              <td className="border p-2">{project.description}</td>
              <td className="border p-2">{project.department ? project.department : "Department Not assigned"}</td>
              <td className="border p-2">{new Date(project.open_until).toDateString()}</td>
              <td className="border p-2">{project.status}</td>
              <td className="border p-2">{new Date(project.created_at).toDateString()}</td>
              <td className="border p-2">{project.technology.join(',')}</td>
              <td className="border p-2">
              {project.image_path.slice(-4) != 'null' ? <a href={backendHost + '/' + project.image_path}>Click to Open</a> : "Image not available" }
              </td>
              <td className="border p-2">{project.openings}</td>
              <td className="border p-2">
                    {project.pdf_path.slice(-4) != 'null' ? <a href={backendHost + '/' + project.pdf_path}>Click to Open</a> : "PDF not available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState, useMemo } from "react";
import { MyContext } from "../context/myContext";
import { toast, ToastContainer } from "react-toastify";
import UserCard from "../components/userCard";
import socket from "../socket.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [toShow, setToShow] = useState([]);
  const [selected, setSelected] = useState("all");
  const [userType,setUserType] = useState("all");

  const [filters, setFilters] = useState({
    name: "",
    graduation_year: "",
    degree: "",
    user_type:""
  });

  const { backendHost, toastOptions } = useContext(MyContext);

  const handleChangeForm = (e) => {
    const { id, value } = e.target;
    setFilters((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleUserSelect = (e) => {
    setUserType(e.target.value);
  }

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        (selected === "all" ||
          (selected === "active" && !user.suspended) ||
          (selected === "suspended" && user.suspended)) &&

          (userType == user.user_type || userType == 'all') &&

        (filters.name === "" ||
          (user.first_name + " " + user.last_name)
            .toLowerCase()
            .includes(filters.name.toLowerCase())) &&
        (filters.degree === "" ||
          user.degree.toLowerCase().includes(filters.degree.toLowerCase())) &&
        (filters.graduation_year === "" ||
          user.graduation_year.toString().includes(filters.graduation_year))
    );
  }, [users, selected, filters,userType]);

  const handleUserChange = async (id,status) => {
        try {
            const res = await fetch(backendHost + '/api/admin/' + (status==false ? 'suspendUser' : 'activeUser'),{
                method:"POST",
                body:JSON.stringify({
                    user_id : id
                }),
                headers:{
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json();

            if(!data.success){
                toast.error(data.message,toastOptions);
            }
            else{
                socket.emit(status == false ? "suspend" : "active",{id})
                toast.success("Changed Status Successfully",toastOptions);
                setUsers(prevList => (
                    prevList.map((elem) => (
                        elem.id2 == id ? {...elem,suspended : status==true ? false : true} : elem
                    ))
                ))
            }

        } catch (err) { 
            toast.error(err.message,toastOptions);
        }
  }

  useEffect(() => {
    setToShow(filteredUsers);
  }, [filteredUsers]);

  useEffect(() => {
    const API_CALL = async () => {
      const res = await fetch(backendHost + "/api/admin/users", {
        credentials : 'include'
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
        return;
      } else {
        toast.success("Users fetched Successfully", toastOptions);
        setUsers(data.data);
        setToShow(data.data);
      }
    };
    API_CALL();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-24 md:mt-5">
      <div className="flex flex-col md:flex-row gap-x-2 gap-y-2 text-center items-center justify-center">
        <label>Filter Users</label>
        <select
          value={selected}
          onChange={handleChangeSelect}
          className="border-2 border-black px-2"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
        <select
          value={userType}
          onChange={handleUserSelect}
          className="border-2 border-black px-2"
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>
        <form className="flex flex-col md:flex-row gap-x-2 gap-y-2">
          <input
            type="text"
            value={filters.name}
            onChange={handleChangeForm}
            id="name"
            placeholder="Name"
            className="border-2 rounded-sm px-2 py-2"
          />
          <input
            type="text"
            value={filters.graduation_year}
            onChange={handleChangeForm}
            id="graduation_year"
            placeholder="Grad Year"
            className="border-2 rounded-sm px-2 py-2"
          />
          <input
            type="text"
            value={filters.degree}
            onChange={handleChangeForm}
            id="degree"
            placeholder="Degree"
            className="border-2 rounded-sm px-2 py-2"
          />
         
        </form>
      </div>
      <div className="mt-24 md:mt-4 flex items-center justify-center flex-wrap gap-y-5 px-7">
        {toShow.map((elem) => (
          <UserCard user={{...elem,profile_picture : elem.profile_picture && elem.profile_picture.startsWith('http') ? elem.profile_picture : backendHost + '/' + elem.profile_picture}} handleUserChange={handleUserChange} key={elem.id2} />
        ))}
      </div>
    </div>
  );
}

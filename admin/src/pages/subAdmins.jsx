/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState, useMemo } from "react";
import { MyContext } from "../context/myContext";
import { toast, ToastContainer } from "react-toastify";
import AdminCard from "../components/adminCard";

export default function SubAdmins() {
  const [users, setUsers] = useState([]);
  const [toShow, setToShow] = useState([]);
  const [selected, setSelected] = useState("all");

  const [filters, setFilters] = useState({
    name: "",
    dept: "",
  });

  const { backendHost, toastOptions } = useContext(MyContext);

  const handleChangeForm = (e) => {
    const { id, value } = e.target;
    setFilters((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        (selected === "all" ||
          (selected === "active" && user.status=='active') ||
          (selected === "suspended" && user.status=='suspended')) &&
        (filters.name === "" ||
          (user.name)
            .toLowerCase()
            .includes(filters.name.toLowerCase())) &&
        (filters.dept === "" ||
          user.department.toLowerCase().includes(filters.dept.toLowerCase()))
        
    );
  }, [users, selected, filters]);

  const handleUserChange = async (id,status) => {
        try {
            const res = await fetch(backendHost + '/api/admin/' + (status=='active' ? 'suspendSubAdmin' : 'activeSubAdmin'),{
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
                toast.success("Changed Status Successfully",toastOptions);
                setUsers(prevList => (
                    prevList.map((elem) => (
                        elem.user_id == id ? {...elem,status : status=='active' ? 'suspended' : 'active'} : elem
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
      const res = await fetch(backendHost + "/api/admin/viewSubAdmins", {
        credentials : "include"
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
        return;
      } else {
        toast.success("Sub Admins fetched Successfully", toastOptions);
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
            value={filters.dept}
            onChange={handleChangeForm}
            id="dept"
            placeholder="Department"
            className="border-2 rounded-sm px-2 py-2"
          />
        </form>
      </div>
      <div className="mt-24 md:mt-4 flex items-center justify-center flex-wrap gap-y-5 px-5 gap-x-5">
        {toShow.map((elem) => (
          <AdminCard user={elem} handleUserChange={handleUserChange} key={elem.id} />
        ))}
      </div>
    </div>
  );
}

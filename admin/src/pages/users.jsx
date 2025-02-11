/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/myContext";
import { toast, ToastContainer } from "react-toastify";
import UserCard from "../components/userCard";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [toShow, setToShow] = useState([]);
  const [selected, setSelected] = useState("all");

  const [filters, setFilters] = useState({
    name: "",
    graduation_year: "",
    degree: "",
  });

  const { backendHost, toastOptions } = useContext(MyContext);

  const handleChangeForm = (e) => {
    const { id, value } = e.target;
    setFilters((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        (selected == "all" ||
          (selected == "active" && user.suspended == false) ||
          (selected == "suspended" && user.suspended == true)) 
          &&
        // Name Filter
        (filters.name === "" ||
          (user.first_name + " " + user.last_name)
            .toLowerCase()
            .includes(filters.name.toLowerCase())) 
            &&
        // Degree Filter
        (filters.degree === "" ||
          user.degree.toLowerCase().includes(filters.degree.toLowerCase())) 
        &&
        // Graduation Year Filter
        (filters.graduation_year === "" ||
          user.graduation_year.toString().includes(filters.graduation_year))
    );
    setToShow(filtered);
  }, [users, filters, selected]);

  useEffect(() => {
    const API_CALL = async () => {
      const res = await fetch(backendHost + "/api/admin/users", {});

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
      <div className="mt-24 md:mt-4 flex items-center justify-center flex-wrap gap-y-5 px-5">
        {toShow.map((elem) => (
          <UserCard user={elem} key={elem.id2} />
        ))}
      </div>
    </div>
  );
}

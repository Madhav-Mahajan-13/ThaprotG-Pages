import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/myContext";
import { toast } from "react-toastify";
import EventCard from "../components/eventCard";

export default function Events() {
  const [imList, setImlist] = useState([]);
  const [imToShow, setImToShow] = useState(imList);
  const { backendHost, toastOptions } = useContext(MyContext);
  const [selected, setSelected] = useState("all");


  useEffect(() => {
    const API_CALL = async () => {
      const res = await fetch(backendHost + "/api/admin/viewEvents",{
        credentials : "include"
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        setImlist(data.data);
        setImToShow(data.data);
        toast.success("Fetched Events",toastOptions)
      }
    };
    API_CALL();
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    setImToShow(imList.filter((elem) => selected === "all" || elem.status === selected));
  }, [selected, imList]);

  const handleStatusChange = async (id, status) => {
    try {
      console.log("HERE");
      const res = await fetch(
        backendHost + "/api/admin/" + (status === "active" ? "suspendEvent" : "activeEvent"),
        {
          method: "POST",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
          credentials : 'include'
        }
      );

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        setImlist((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, status: status === "active" ? "suspended" : "active" } : item
          )
        );
        toast.success("Status Updated", toastOptions);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(backendHost + "/api/admin/deleteEvent", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        setImlist((prevList) => prevList.filter((item) => item.id !== id));
        toast.success("Event Deleted", toastOptions);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 mt-24 md:mt-5">

      {/* Filter Dropdown */}
      <div className="flex flex-row gap-x-4 items-center justify-center">
        <label htmlFor="dropdown">Filter Carousel Images</label>
        <select id="dropdown" onChange={handleChange} value={selected} className="border-2 border-black px-2">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>


      {/* Image List */}
      <div className="flex flex-col md:flex-row flex-wrap w-full gap-x-5 items-center justify-center gap-y-5 px-5 md:px-2">
        {imToShow.map((elem) => (
          <EventCard
            event={{...elem,imgpath:(backendHost+'/'+elem.imgpath)}}
            key={elem.id}
            handleStatusChange={handleStatusChange}
            handleDelete = {handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

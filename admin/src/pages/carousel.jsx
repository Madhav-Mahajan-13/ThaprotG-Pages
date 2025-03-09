import { useContext, useEffect, useRef, useState } from "react";
import ImageCard from "../components/imageCard";
import { MyContext } from "../context/myContext";
import { toast } from "react-toastify";

export default function Carousel() {
  const [imList, setImlist] = useState([]);
  const [imToShow, setImToShow] = useState(imList);
  const { backendHost, toastOptions } = useContext(MyContext);
  const [selected, setSelected] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const API_CALL = async () => {
      const res = await fetch(backendHost + "/api/admin/viewCarousel",{
        'credentials' : 'include'
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        setImlist(data.data);
        setImToShow(data.data);
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
        backendHost + "/api/admin/" + (status === "active" ? "suspendCarousel" : "activeCarousel"),
        {
          method: "POST",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
          'credentials' : 'include'
        },
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
      const res = await fetch(backendHost + "/api/admin/deleteCarousel", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
        'credentials' : 'include'
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        setImlist((prevList) => prevList.filter((item) => item.id !== id));
        toast.success("Carousel Entry Deleted", toastOptions);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("img_description", e.target.img_description.value);
    formData.append("image", e.target.image.files[0]); // The actual image file
    formData.append("status", e.target.status.checked ? 'active' : 'suspended');

    try {
      const res = await fetch(backendHost + "/api/admin/createCarousel", {
        method: "POST",
        body: formData,
        'credentials' : 'include'
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        setImlist([data.data,...imList]);
        toast.success("Image Added Successfully", toastOptions);
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

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

      {/* Open Modal Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add New Image
        </button>
      </div>

      {/* Image List */}
      <div className="flex flex-col md:flex-row flex-wrap w-full gap-x-5 items-center justify-center gap-y-5 px-5 md:px-2">
        {imToShow.map((elem) => (
          <ImageCard
            title={elem.title}
            url={backendHost + "/" + elem.image_path}
            id={elem.id}
            status={elem.status}
            key={elem.id}
            description={elem.img_description}
            handleStatusChange={handleStatusChange}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {/* Compact Centered Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Modal Content */}
          <div
            ref={modalRef}
            className="relative bg-white p-6 rounded-lg shadow-lg w-80 z-10"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Image</h2>
            <form onSubmit={handleAddImage} className="flex flex-col space-y-3">
              <input type="text" name="title" placeholder="Title" className="border p-2 rounded-md" required />
              <input type="text" name="img_description" placeholder="Description" className="border p-2 rounded-md" />
              <input type="file" name="image" accept="image/*" className="border p-2 rounded-md" required />
              <div className="gap-x-2 flex">
              <input type="checkbox" name="status" className="border p-2 rounded-md"/>
              <label htmlFor="status">Active</label>
              </div>
              <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition">
                Upload Image
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { TbCarouselHorizontal } from "react-icons/tb";
import { MdEventSeat } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import tw from "tailwind-styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IoDocumentText } from "react-icons/io5";
import { MdApproval } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { MyContext } from "../context/myContext";
import { toast } from "react-toastify";

const Sidebutton = tw.div`
cursor-pointer
flex
flex-row
gap-x-2
items-center
border-b-1
border-b-black
${(p) => (p.$selected ? "font-bold" : "")} 
py-1
px-2
`;

export default function Sidebar() {
  const [isSelected, setSelected] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { user_type, toastOptions, backendHost } = useContext(MyContext);

  const handleLogout = async () => {
    try {
      const res = await fetch(backendHost + "/api/admin/logout", {
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        console.log("HERE");
        toast.success(data.message, toastOptions);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (e) {
      toast.error(e.message, toastOptions);
    }
  };

  useEffect(() => {
    if (location.pathname == "/") setSelected(null);
    if (location.pathname == "/carousel") setSelected(0);
    if (location.pathname == "/events") setSelected(1);
    if (location.pathname == "/addevent") setSelected(2);
    if (location.pathname == "/projects") setSelected(3);
    if (location.pathname == "/pendingprojects") setSelected(4);
    if (location.pathname == "/rejectedprojects") setSelected(5);
    if (location.pathname == "/subAdmins") setSelected(6);
    if (location.pathname == "/addsubadmin") setSelected(7);
    if (location.pathname == "/users") setSelected(8);
    if (location.pathname == "/insights") setSelected(9);
    if (location.pathname == "/addInsight") setSelected(10);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[rgb(206, 211, 219)] gap-y-5 py-2 items-center shadow-2xl hidden md:flex min-w-[13rem]">
      <div className="w-20">
        <Link to="/">
          <img src={logo}></img>
        </Link>
      </div>

      <div className="flex flex-col gap-y-4 justify-start">
        {user_type == "main" && (
          <Link to="carousel">
            <Sidebutton $selected={isSelected === 0}>
              <TbCarouselHorizontal />
              <h1>Carousel Images</h1>
            </Sidebutton>
          </Link>
        )}

        {user_type == "main" && (
          <Link to="/events">
            <Sidebutton $selected={isSelected === 1}>
              <MdEventSeat />
              <h1>Events</h1>
            </Sidebutton>
          </Link>
        )}

        {user_type == "main" && (
          <Link to="/addevent">
            <Sidebutton $selected={isSelected === 2}>
              <FaCalendarPlus />
              <h1>Add Events</h1>
            </Sidebutton>
          </Link>
        )}

        <Link to="/projects">
          <Sidebutton $selected={isSelected === 3}>
            <IoDocumentText />
            <h1>Approved Projects</h1>
          </Sidebutton>
        </Link>

        <Link to="/pendingprojects">
          <Sidebutton $selected={isSelected === 4}>
            <MdApproval />
            <h1>Pending Projects</h1>
          </Sidebutton>
        </Link>

        <Link to="/rejectedprojects">
          <Sidebutton $selected={isSelected === 5}>
            <ImCross />
            <h1>Rejected Projects</h1>
          </Sidebutton>
        </Link>

        {user_type == "main" && (
          <Link to="/subAdmins">
            <Sidebutton $selected={isSelected === 6}>
              <FaUser />
              <h1>Sub Admins</h1>
            </Sidebutton>
          </Link>
        )}
        {user_type == "main" && (
          <Link to="/addsubadmin">
            <Sidebutton $selected={isSelected === 7}>
              <FaUserPlus />
              <h1>Add Sub Admins</h1>
            </Sidebutton>
          </Link>
        )}

        {user_type == "main" && (
          <Link to="/users">
            <Sidebutton $selected={isSelected === 8}>
              <FaUser />
              <h1>Users</h1>
            </Sidebutton>
          </Link>
        )}
        {user_type == "main" && (
          <Link to="/insights">
            <Sidebutton $selected={isSelected === 9}>
              <FaUser />
              <h1>Insights</h1>
            </Sidebutton>
          </Link>
        )}

        {user_type == "main" && (
          <Link to="/addInsight">
            <Sidebutton $selected={isSelected === 10}>
              <FaUser />
              <h1>Add Insight</h1>
            </Sidebutton>
          </Link>
        )}
      </div>
      <button
        className="bg-red-500 px-2 py-2 mt-5 cursor-pointer"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
}

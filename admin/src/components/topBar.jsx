/* eslint-disable no-unused-vars */
import { useState, useEffect,useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import tw from "tailwind-styled-components";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoDocumentText } from "react-icons/io5";
import { MdApproval } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { TbCarouselHorizontal } from "react-icons/tb";
import { MdEventSeat } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { MyContext } from "../context/myContext";
import { useNavigate } from "react-router-dom";
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

export default function TopBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setSelected] = useState(null);
    const location = useLocation();
    const {user_type,backendHost,toastOptions} = useContext(MyContext);
    const navigate = useNavigate();
  const handleLogout = async () => {
      try {
          const res = await fetch(backendHost + '/api/admin/logout',{
            "credentials" : 'include'
          })
  
          const data = await res.json();
          if(!data.success){
            toast.error(data.message,toastOptions);
          }
          else
          {
            console.log("HERE");
            toast.success(data.message,toastOptions);
            setTimeout(() => {
              navigate('/login')
            },500)
          }
  
      } catch (e) {
        toast.error(e.message,toastOptions)
      }
    }

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

  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* 🔹 Navbar with Hamburger Menu */}
      <div className="flex flex-row fixed top-0 z-2 justify-between items-center md:hidden w-screen px-7 py-3 shadow-2xl bg-white">
        <div className="w-14">
            <Link to='/'>
                <img src={logo} alt="Logo" />
            </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
          <GiHamburgerMenu />
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 z-3 right-0 h-screen bg-white text-black w-64 py-5 px-4 shadow-inner transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-2xl">
          ✖
        </button>

        <div className="flex flex-col gap-y-4 mt-10">
          {
                  user_type == 'main' && <Link to='carousel'>
                  <Sidebutton $selected={isSelected === 0} >
                    <TbCarouselHorizontal />
                    <h1>Carousel Images</h1>
                  </Sidebutton>
                  </Link>
                  }
          
                  {
                  user_type == 'main' && <Link to='/events'>
                  <Sidebutton $selected={isSelected === 1} >
                    <MdEventSeat />
                    <h1>Events</h1>
                  </Sidebutton>
                  </Link>
                  }
          
          
                  {
                  user_type == 'main' && <Link to='/addevent'>
                  <Sidebutton $selected={isSelected === 2} >
                    <FaCalendarPlus />
                    <h1>Add Events</h1>
                  </Sidebutton>
                  </Link>
                  }
          
                  <Link to='/projects'>
                  <Sidebutton $selected={isSelected === 3} >
                    <IoDocumentText />
                    <h1>Approved Projects</h1>
                  </Sidebutton>
                  </Link>
          
                  <Link to='/pendingprojects'>
                  <Sidebutton $selected={isSelected === 4} >
                    <MdApproval />
                    <h1>Pending Projects</h1>
                  </Sidebutton>
                  </Link>
          
                  <Link to='/rejectedprojects'>
                  <Sidebutton $selected={isSelected === 5} >
                    <ImCross />
                    <h1>Rejected Projects</h1>
                  </Sidebutton>
                  </Link>
                  
          
                  {
                  user_type == 'main' && <Link to='/subAdmins'>
                  <Sidebutton $selected={isSelected === 6} >
                    <FaUser />
                    <h1>Sub Admins</h1>
                  </Sidebutton>
                  </Link>
                  }
                  {
                  user_type == 'main' && <Link to='/addsubadmin'>
                      <Sidebutton $selected={isSelected === 7} >
                          <FaUserPlus />
                          <h1>Add Sub Admins</h1>
                      </Sidebutton>
                  </Link>
                  }
          
                  {
                  user_type == 'main' && <Link to='/users'>
                      <Sidebutton $selected={isSelected === 8} >
                        <FaUser />
                          <h1>Users</h1>
                      </Sidebutton>
                  </Link>
                  }

                  {
                  user_type == 'main' && <Link to='/insights'>
                      <Sidebutton $selected={isSelected === 9} >
                        <FaUser />
                          <h1>Insights</h1>
                      </Sidebutton>
                  </Link>
                  }

                  {
                  user_type == 'main' && <Link to='/addInsight'>
                      <Sidebutton $selected={isSelected === 10} >
                        <FaUser />
                          <h1>Add Insight</h1>
                      </Sidebutton>
                  </Link>
                  }

                  <button className="bg-red-500 px-2 py-2 mt-5 cursor-pointer" onClick={handleLogout}>LOGOUT</button>   

        </div>
      </aside>
    </>
  );
}

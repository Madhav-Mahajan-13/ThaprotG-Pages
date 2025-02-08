import { useState } from "react";
import logo from "../assets/logo.png";
import { TbCarouselHorizontal } from "react-icons/tb";
import { MdEventSeat } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import tw from "tailwind-styled-components";
import {Link,useLocation} from 'react-router-dom';
import { useEffect } from "react";
import { IoDocumentText } from "react-icons/io5";
import { MdApproval } from "react-icons/md";
import { ImCross } from "react-icons/im";

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

  useEffect(() => {
    if(location.pathname == '/') setSelected(null);
    if(location.pathname == '/carousel') setSelected(0);
    if(location.pathname == '/events') setSelected(1);
    if(location.pathname == '/addevent') setSelected(2);
    if(location.pathname == '/projects') setSelected(3);
    if(location.pathname == '/pendingprojects') setSelected(4);
    if(location.pathname == '/rejectedprojects') setSelected(5);
  },[location.pathname])

  return (
    <div className="flex flex-col min-h-screen bg-[rgb(206, 211, 219)] px-5 gap-y-5 py-2 items-center shadow-2xl hidden md:flex">
      <div className="w-20">
        <Link to='/'>
        <img src={logo}></img>
        </Link>
      </div>

      <div className="flex flex-col gap-y-4 justify-start">

        <Link to='carousel'>
        <Sidebutton $selected={isSelected === 0} >
          <TbCarouselHorizontal />
          <h1>Carousel Images</h1>
        </Sidebutton>
        </Link>

        <Link to='/events'>
        <Sidebutton $selected={isSelected === 1} >
          <MdEventSeat />
          <h1>Events</h1>
        </Sidebutton>
        </Link>


        <Link to='/addevent'>
        <Sidebutton $selected={isSelected === 2} >
          <FaCalendarPlus />
          <h1>Add Events</h1>
        </Sidebutton>
        </Link>

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

      </div>
    </div>
  );
}

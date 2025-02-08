import { useState } from "react";
import logo from "../assets/logo.png";
import { TbCarouselHorizontal } from "react-icons/tb";
import { MdEventSeat } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import tw from "tailwind-styled-components";
import {Link} from 'react-router-dom';

export default function Sidebar() {
  const [isSelected, setSelected] = useState(0);

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
    shadow-inner
    px-2
`;

  return (
    <div className="flex flex-col min-h-screen bg-[rgb(206, 211, 219)] px-5 gap-y-5 py-2 items-center shadow-2xl">
      <div className="w-20">
        <img src={logo}></img>
      </div>

      <div className="flex flex-col gap-y-4 justify-start">

        <Link to=''>
        <Sidebutton $selected={isSelected === 0} onClick={() => setSelected(0)}>
          <TbCarouselHorizontal />
          <h1>Carousel Images</h1>
        </Sidebutton>
        </Link>

        <Link to=''>
        <Sidebutton $selected={isSelected === 1} onClick={() => setSelected(1)}>
          <MdEventSeat />
          <h1>Events</h1>
        </Sidebutton>
        </Link>


        <Link to='/addevent'>
        <Sidebutton $selected={isSelected === 2} onClick={() => setSelected(2)}>
          <FaCalendarPlus />
          <h1>Add Events</h1>
        </Sidebutton>
        </Link>
      </div>
    </div>
  );
}

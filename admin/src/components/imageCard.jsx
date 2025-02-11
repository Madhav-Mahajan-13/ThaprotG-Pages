/* eslint-disable react/prop-types */
import { ImCross } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

export default function ImageCard(props){
    const {id,title,url,status,handleStatusChange,handleDelete} = props;
    return(
        <div className="flex flex-col text-center w-full md:w-xs border-2 border-black rounded-md relative">
            {status == 'active' ? <div className="absolute rounded bg-red-600 -left-2 -top-2 w-7 h-7 flex items-center justify-center" onClick={() => {handleStatusChange(id,status)}}>
                <ImCross color="white"/>
            </div> 
            : 
            <div className="absolute rounded bg-green-400 -left-2 -top-2 w-7 h-7 flex items-center justify-center" onClick={() => {handleStatusChange(id,status)}}>
                <TiTick color="white"/>
            </div>
            }
            <div className="absolute rounded bg-red-600 -right-2 -top-2 w-7 h-7 flex items-center justify-center" onClick={() => {handleDelete(id)}}>
                <RiDeleteBin6Line color="white"/>
            </div>
            <h1 className="px-5">{title}</h1>
            <img src={url} className="w-full"/>
        </div>
    )
}
/* eslint-disable react/prop-types */
import { ImCross } from "react-icons/im";
export default function ImageCard(props){
    return(
        <div className="flex flex-col text-center w-full md:w-xs border-2 border-black rounded-md relative">
            <div className="absolute rounded bg-red-600 -right-2 -top-2 w-7 h-7 flex items-center justify-center">
                <ImCross color="white"/>
            </div>
            <h1 className="px-5">{props.title}</h1>
            <img src={props.url} className="w-full"/>
        </div>
    )
}

import React,{useState} from "react";
import { MyContext } from "./context";
import { Bounce } from "react-toastify";

const MyProvider = ({children}) => {
    const toastOptions ={
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }

    const [userId,setUserId] = useState(null);
    const [isAlum,setIsAlum] = useState(null);
    const [token,setToken] = useState(null);

    // const backendHost = 'https://1213-117-203-246-41.ngrok-free.app'
    const backendHost = 'http://localhost:5000'

    return (
        <MyContext.Provider value={{toastOptions,backendHost,userId,setUserId,isAlum,setIsAlum,token,setToken}}>
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider
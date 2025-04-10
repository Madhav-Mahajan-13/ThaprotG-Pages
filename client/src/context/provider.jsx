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
    const [authToken,setToken] = useState(null);

    // const backendHost = 'https://1213-117-203-246-41.ngrok-free.app'
    const backendHost = 'http://172.31.4.32:5000'

    return (
        <MyContext.Provider value={{toastOptions,backendHost,userId,setUserId,isAlum,setIsAlum,authToken,setToken}}>
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider
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

    // const backendHost = 'https://1213-117-203-246-41.ngrok-free.app'
    const backendHost = 'http://localhost:80'

    return (
        <MyContext.Provider value={{toastOptions,backendHost}}>
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider
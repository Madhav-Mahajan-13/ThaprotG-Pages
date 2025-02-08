/* eslint-disable react/prop-types */
import { MyContext } from "./myContext";
import { useState } from "react";
import { Bounce } from "react-toastify";

const MyProvider = ({ children }) => {
    const toastOptions = {
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
    const backendHost = "http://localhost:5000";
    const [approved_projects, setProjects] = useState([]);

    return (
        <MyContext.Provider value={{ backendHost, approved_projects, setProjects,toastOptions }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
import React from "react";
import {Navigate,Outlet} from "react-router-dom";


const PrivateComponent=()=>{
    const auther=localStorage.getItem("val")
    return (
        auther ?<Outlet />:<Navigate to="/Signup" />)
}
export default PrivateComponent;
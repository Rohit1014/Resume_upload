import React from "react";
import {  Link, useNavigate } from "react-router-dom";

const Nav=()=>{
    const auther=localStorage.getItem("val")
    const navigate=useNavigate();
    const logout=()=>{  
             localStorage.clear();
             navigate("/login")
    }
    return(
        <div  className="navbar">
        { auther?
            <ul  className="navbar-menu">
                <li className="navbar-item"><Link to="/apply">Apply</Link></li>
                
                <li className="navbar-item"><Link onClick={logout} to="/login">Logout({JSON.parse(auther).name})</Link></li>
                </ul>
                :
                <ul className="nav-right">
                    <li className="navbar-item"><Link to="/signup">Signup</Link></li>
                    <li className="navbar-item"><Link to="/login">Login</Link></li>
                </ul>
                }
            </div>
    );

}

export default Nav;
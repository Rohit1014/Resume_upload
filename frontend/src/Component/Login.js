import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login=()=>{
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate();
    useEffect(()=>{
   const auther=localStorage.getItem("val")
   if(auther){
    navigate("/")
   }
    },[navigate])

        const  LoginBtn=async()=>{
            let response = await axios.post('http://localhost:5000/login', {
                email,
                password
            });
             if(response.data.auth && response.status===200){ 
                    localStorage.setItem("val", JSON.stringify(response.data.user));
                    localStorage.setItem("Token", response.data.auth);
                    navigate("/")
            }
            else{
                 alert("details not matched");
                 }


          
        
        
    }

    return(
        <div className="login"> 
             <h1 className="head">Login</h1>
            <input className="inputbox" type="text" placeholder="Enter email" value={email} onChange={(e)=>setemail(e.target.value)}/>
            <input className="inputbox" type="password" placeholder="Enter password"value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <button type="submit"className="loginbutton"  onClick={LoginBtn}>Login</button>

        </div>
    )
}
export default Login
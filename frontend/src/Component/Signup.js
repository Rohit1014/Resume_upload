import {React,useState,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const Signup=()=>{
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
       const auther=localStorage.getItem("val")
       if(auther){
        navigate("/")
       }
   },[navigate])

    const CollectData=async()=>{
        const response = await axios.post('https://resume-upload-backend.onrender.com', {
            name,
            email,
            password
        });

        if (response.status === 200) {
            alert('Registration Successful!');
            localStorage.setItem("val", JSON.stringify(response.data.user));
            localStorage.setItem("Token", response.data.auth);
            navigate("/")
        }
        else{
             alert('Registration Failed!');
             

        }       
    }

    return(
        <div className="register">
            <h1 className="head">Register Here</h1>
            <input className="inputbox" type="text" placeholder="Enter name" value={name} onChange={(e)=>setname(e.target.value)} />
            <input className="inputbox" type="email" placeholder="Enter email" value={email} onChange={(e)=>setemail(e.target.value)}/>
            <input className="inputbox" type="password" placeholder="Enter password"value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <button onClick={CollectData} className="signinbutton" type="button" >signup</button>

        </div>
    );

}
export default Signup;
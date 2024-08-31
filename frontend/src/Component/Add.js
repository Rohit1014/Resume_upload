import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const Submit = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("profile", file);

        try {
            let response = await axios.post("http://localhost:5000/uploads", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

            if (response.status === 200) {
                alert("File uploaded successfully");
                navigate("/");
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    alert(err.response.data.error); 
                    navigate("/")
                } 
            } else {
                setError("Error in setting up request.");
            }
        }
    };

    return (
        <div className="add-product">
            <h3>Add Product</h3>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            <input
                type="text"
                placeholder="Enter Name"
                className="inputbox"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Email"
                className="inputbox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Phone"
                className="inputbox"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input type="file" className="inputbox" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={Submit} className="productbtn" type="submit">
                Add Product
            </button>
        </div>
    );
};

export default Add;

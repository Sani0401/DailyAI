import React, { useState, useEffect } from "react";
import "../styles/AdminLogin.css";
import { Button } from "react-bootstrap";
import imageIcon from "../Images/ai.png";
import Instance from "../config/axiosInstance.js";
import apiURL from "../config/apiURL.js";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const adminData = {
      adminEmail: email,
      adminPassword: password,
    };

    try {
      const token = await Instance.post(apiURL.adminlogin, adminData);

      if (token.data) {
        localStorage.setItem("token", token.data);
        navigate("/admin");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized Access");
      } else {
        console.error("Error occurred:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, []);

  return (
    <>
      <div className="main__container">
        <div className="input__container">
          <div className="logoTitle">
            <img src={imageIcon} className="logoImage" />
            <h3>Admin Login</h3>
          </div>

          <input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
          
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;

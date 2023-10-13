import React, { useState, useEffect } from "react";
import "../Login/Login.css"; // Import your existing CSS file
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext } from "../../MyContext"; // Import the context hook
import "./Admin.css";
import axios from "axios"; // Import axios
import ReCAPTCHA from "react-google-recaptcha";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedCrud } = useMyContext(); // Access the setLoggedMain function from the context
  const [shoulNavigateCrud, setShouldNavigateCrud] = useState(false);
  const { setAdminToken } = useMyContext();
  const [verified, setVerified] = useState(false);

  const callAdminLoginApi = () => {
    // Make an API call to authenticate the admin
    axios
      .post("https://localhost:7013/api/admin/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        // API call successful, get the token
        sessionStorage.setItem("adminToken", response.data.token);
        setAdminToken(response.data.token);
        // Store the token securely (e.g., in localStorage or a secure cookie)
        // Navigate to the admin dashboard or perform any other actions as needed
        setShouldNavigateCrud(true);
      })
      .catch((error) => {
        // API call failed, display an error toast
        toast.error("Admin login failed. Please check your credentials.");
        console.log("Admin login error:", error);
      });
  };

  useEffect(() => {
    if (shoulNavigateCrud) {
      // Perform navigation after state change
      setLoggedCrud(true);
      navigate("/crud");
    }
  }, [shoulNavigateCrud, navigate, setLoggedCrud]);
  function onChangeCaptcha(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }
  return (
    <div className="page-container">
      <ToastContainer />
      <div className="background-image"></div>
      <div className="white-container">
        <div className="right-container">
          <h2 className="login-title">Admin Login</h2>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={10}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={35}
          />
          <ReCAPTCHA
            sitekey="6LfSI3AoAAAAALo7DGjbfDkj1gO0r202-crVzwAa"
            onChange={onChangeCaptcha}
          />
          <button
            onClick={callAdminLoginApi}
            className="login-button"
            disabled={!verified}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

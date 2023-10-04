import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import c3alogo from "../../images/c3alogo.png";
import nustlogo from "../../images/nustlogo.png";
import { useMyContext } from "../../MyContext"; // Import the context hook
import ReCAPTCHA from "react-google-recaptcha";

const Login = ({ setUserId, setUserName, setUserEmail, setUserComments }) => {
  const { setLoggedMain } = useMyContext(); // Access the setLoggedMain function from the context
  const { setLoggedCrud } = useMyContext(); // Access the setLoggedMain function from the context
  const { setToken } = useMyContext();
  const navigate = useNavigate();
  const [shoulNavigateCrud, setShouldNavigateCrud] = useState(false);
  const [shoulNavigatedMain, setShouldNavigateMain] = useState(false);

  const [name, setName] = useState("");
  const [cmsID, setCmsID] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [data, setData] = useState([]);
  const [verified, setVerified] = useState(false);
  // Function to handle the Enter key press event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      postData();
    }
  };

  const getData = () => {
    axios
      .get("https://localhost:7013/api/Users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*** New Post method */
  const postData = () => {
    if (name === "admin" && cmsID === "123456" && email === "admin@c3a.nust") {
      setShouldNavigateCrud(true);
      return;
    }
    // Check valid cms
    if (cmsID.length !== 6) {
      toast.error("Please enter a valid 6-digit CMS ID");
      return;
    }

    // Check valid email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Construct the API URL using the entered CMS ID
    const apiURL = `https://localhost:7013/api/QalamApi?cms=${cmsID}&username=${name}&useremail=${email}&usercnic=${cnic}`;

    axios
      .get(apiURL)
      .then((response) => {
        const responseData = response.data;

        if (
          responseData.result.status === 200 &&
          responseData.result.response === true
        ) {
          // CMS ID exists, proceed with login
          const url = "https://localhost:7013/api/Users";
          const data = {
            cmS_ID: cmsID,
            name: name,
            email: email,
            anger_Score: 0,
            depression_Score: 0,
            anxiety_Score: 0,
            selfesteem_Score: 0,
            comments: "",
            clientOfC3A: "",
            email_Sent: "No",
          };

          axios
            .post(url, data)
            .then((response) => {
              getData();
              clear();
              toast.success("Login Successful");
              console.log("response", response.data.token);
              setToken(response.data.token);
              setTimeout(() => {
                setUserId(cmsID);
                setUserName(name);
                setUserEmail(email);
                setUserComments("");
                setShouldNavigateMain(true);
              }, 1000);
            })
            .catch((error) => {
              if (error.response && error.response.status === 409) {
                toast.success("Welcome Back " + name + "!");
                console.log("response", response.data.token);
                setToken(response.data.token);
                // User already exists, route to next page with toast message
                setTimeout(() => {
                  setUserId(cmsID);
                  setUserName(name);
                  setUserEmail(email);
                  setUserComments("");
                  setShouldNavigateMain(true);
                }, 1000);
              } else if (error.response && error.response.status === 500) {
                toast.error("User with this CMS ID already exists");
                toast.error("Please enter correct name and email");
              } else {
                toast.error(error);
              }
            });
        } else {
          toast.error("CMS ID does not exist in our records");
        }
      })
      .catch((error) => {
        // Handle API call error
        toast.error("An error occurred while checking the CMS ID");
      });
  };

  /**** Old Post method */
  // const postData = () => {

  //   if (cmsID.length !== 6) {
  //     toast.error("Please enter a valid 6-digit CMS ID");
  //     return;
  //   }

  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!email.match(emailPattern)) {
  //     toast.error("Please enter a valid email address");
  //     return;
  //   }

  //   if (name === 'admin' && cmsID === '1234' && email === 'admin') {
  //     console.log("Admin Login")
  //     setShouldNavigateCrud(true);
  //     return;
  //   }

  //   const url = 'https://localhost:7013/api/Users'
  //   const data = {
  //     "cmS_ID": cmsID,
  //     "name": name,
  //     "email": email,
  //     "anger_Score": 0,
  //     "depression_Score": 0,
  //     "anxiety_Score": 0,
  //     "selfesteem_Score": 0,
  //     "comments": "",
  //     "clientOfC3A": "",
  //     "emailSent": "No"
  //   }
  //   axios.post(url, data)
  //     .then((response) => {
  //       getData();
  //       clear();
  //       toast.success("Login Successfully")

  //       setTimeout(() => {
  //         setUserId(cmsID);
  //         setUserName(name);
  //         setUserEmail(email);
  //         setUserComments("");
  //         navigate("/main-menu");
  //       }, 3000);
  //     })
  //     .catch((error) => {
  //       if (error.response && error.response.status === 409) {
  //         toast.success("Welcome Back " + name + "!");

  //         setTimeout(() => {
  //           setUserId(cmsID);
  //           setUserName(name);
  //           setUserEmail(email);
  //           setUserComments("");
  //           navigate("/main-menu");
  //         }, 3000);

  //       } else if (error.response && error.response.status === 500) {
  //         toast.error("User with this CMS ID already exists");
  //         toast.error("Please enter correct name and email");
  //       }
  //       else {
  //         toast.error(error);
  //       }
  //     })
  // }

  useEffect(() => {
    if (shoulNavigatedMain) {
      setLoggedMain(true);
      navigate("/main-menu");
    }
    if (shoulNavigateCrud) {
      // Perform navigation after state change
      setLoggedCrud(true);
      navigate("/crud");
    }
  }, [
    shoulNavigateCrud,
    shoulNavigatedMain,
    navigate,
    setLoggedMain,
    setLoggedCrud,
  ]);

  // const deleteData = (id) => {
  //   if (window.confirm('Are you sure?')) {
  //     axios.delete(`https://localhost:7013/api/Users/${id}`)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           toast.success("Data deleted successfully from Database")
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error(error)
  //       })

  //   }
  // }

  const clear = () => {
    setName("");
    setCmsID("");
    setEmail("");
  };
  function onChangeCaptcha(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }
  return (
    <div className="page-container">
      <ToastContainer />
      <div className="background-image"></div>
      <div className="white-container">
        <div className="left-container">
          <div className="logo-container">
            <img src={nustlogo} alt="Logo" className="nust-logo-image" />
          </div>
          <h1 className="title">Welcome to the Self-Screening Survey Bot</h1>
          <p className="description">
            The objective of this bot is to help you gain valuable insight about
            your struggles as it allows you to self-screen yourself for anxiety,
            depression, anger and self-esteem at the comfort of your home.
            <br></br>
            <br></br>
            Your information will be kept confidential. Please honestly respond
            to the questions of the survey bot in order to get valid results.
            Feel free to reach out to C3A for further help.
            <br></br>
            <br></br>
            Disclaimer: Data will be used for research purposes but identifying
            details will be confidential
          </p>
          <br></br>
          <br></br>
        </div>
        <div className="right-container">
          <img
            src={c3alogo} // Update the path to your logo image
            alt="Logo"
            className="logo-image"
          />
          <h2 className="login-title">Enter your details</h2>
          <input
            type="text"
            className="input-field"
            placeholder="Your name"
            value={name}
            onKeyDown={handleKeyDown}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <input
            type="text"
            className="input-field"
            placeholder="CMS e.g. 123456"
            value={cmsID}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCmsID(e.target.value)}
            autoComplete="cms-id"
            name="cms-id"
          />
          <input
            type="text"
            className="input-field"
            placeholder="Your email"
            value={email}
            onKeyDown={handleKeyDown}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="text"
            className="input-field"
            placeholder="CNIC e.g 11223-4455667-8"
            value={cnic}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCnic(e.target.value)}
            autoComplete="cnic"
          />
          <ReCAPTCHA
            sitekey="6LfSI3AoAAAAALo7DGjbfDkj1gO0r202-crVzwAa"
            onChange={onChangeCaptcha}
          />
          ,
          <Link>
            <button
              onClick={postData}
              onKeyDown={handleKeyDown}
              className="login-button"
              disabled={!verified}
            >
              Enter
            </button>
          </Link>
          <p className="login-p" onClick={() => navigate("/admin")}>
            Go to Admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import "./topBar.css";

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-logo">Hosla Bot</div>
      {/* <div className="topbar-links">
          <a href="#" className="topbar-link">
            Home
          </a>
          <a href="#" className="topbar-link">
            About
          </a>
          <a href="#" className="topbar-link">
            Contact
          </a>
        </div> */}
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="topbar-logout"
      >
        {" "}
        Logout
      </button>
    </div>
  );
}

export default TopBar;

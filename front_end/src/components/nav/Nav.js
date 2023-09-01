import React from "react";
import "./nav.css";
import logo from "./../../images/logo.png";

function Nav() {
  return (
    <div className="nav">
      <div className="nav__blocks">
        <img src={logo}/>
      </div>
      <div className="nav__blocks"></div>
      <div className="nav__blocks"></div>
    </div>
  );
}

export default Nav;
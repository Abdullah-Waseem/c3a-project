import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
// import logo from '../../images/logo.png'

function Card(props) {
  return (
    <Link className="Link" to={props.link}>
      <div className="card">
        <img src={props.logo} alt="Logo" className="card-logo" />
        <h2>{props.title}</h2>
      </div>
    </Link>
  );
}

export default Card;

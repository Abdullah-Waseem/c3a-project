import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MyProvider } from "./MyContext"; // Import the context provider

render(
  <React.StrictMode>
    <BrowserRouter>
      <MyProvider>
        {" "}
        {/* Wrap the App with the MyProvider */}
        <App />
      </MyProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

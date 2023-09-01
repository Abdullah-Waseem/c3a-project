// MyContext.js
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false); // Initialize to false

  return (
    <MyContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}

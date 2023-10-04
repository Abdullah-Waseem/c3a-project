// MyContext.js
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [loggedCrud, setLoggedCrud] = useState(false);
  const [loggedMain, setLoggedMain] = useState(false);
  const [token, setToken] = useState("");
  return (
    <MyContext.Provider
      value={{
        loggedCrud,
        setLoggedCrud,
        loggedMain,
        setLoggedMain,
        token,
        setToken,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}

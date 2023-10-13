// MyContext.js
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [loggedCrud, setLoggedCrud] = useState(false);
  const [loggedMain, setLoggedMain] = useState(false);
  const [token, setToken] = useState("");
  const [adminToken, setAdminToken] = useState("");
  return (
    <MyContext.Provider
      value={{
        loggedCrud,
        setLoggedCrud,
        loggedMain,
        setLoggedMain,
        token,
        setToken,
        adminToken,
        setAdminToken,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}

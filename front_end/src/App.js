import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainMenu from "./components/MainMenu/mainMenu";
import AngerFormBot from "./components/surveyBot/angerFormBot";
import DepressionFormBot from "./components/surveyBot/depressionFormBot";
import AnxietyFormBot from "./components/surveyBot/anxietyFormBot";
import ConfidenceFormBot from "./components/surveyBot/confidenceFormBot";
import CRUD from "./CRUD";
import Login from "./components/Login/Login";
import RouteGuard from "./components/RouteGuard/RouteGuard";
import { useMyContext } from "./MyContext"; // Import the context hook
import AdminLogin from "./components/Admin/Admin";

function App() {
  const { loggedMain } = useMyContext(); // Access the loggedMain variable from the context
  const { loggedCrud } = useMyContext(); // Access the loggedMain variable from the context

  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [UserComment, setUserComments] = useState(null);

  const handleSetUserId = (id) => {
    setUserId(id);
  };
  const handleSetUserName = (name) => {
    setUserName(name);
  };
  const handleSetUserEmail = (email) => {
    setUserEmail(email);
  };
  const handleSetUserComments = (email) => {
    setUserComments(email);
  };
  console.log(UserComment);
  // If logged in, show the rest of the components with guarded routes
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setNavigate={navigate}
              setUserId={handleSetUserId}
              setUserName={handleSetUserName}
              setUserEmail={handleSetUserEmail}
              setUserComments={handleSetUserComments}
            />
          }
        />
        <Route path="/admin" element={<AdminLogin />} /> {/* Add this route */}
        {loggedMain ? (
          <>
            <Route path="/main-menu" element={<MainMenu />} />
            <Route
              path="/bot"
              element={
                <ConfidenceFormBot
                  id={userId}
                  name={userName}
                  email={userEmail}
                  comments={UserComment}
                />
              }
            />
            <Route
              path="/new-page"
              element={
                <AnxietyFormBot
                  id={userId}
                  name={userName}
                  email={userEmail}
                  comments={UserComment}
                />
              }
            />
            <Route
              path="/new-page2"
              element={
                <DepressionFormBot
                  id={userId}
                  name={userName}
                  email={userEmail}
                  comments={UserComment}
                />
              }
            />
            <Route
              path="/new-page3"
              element={
                <AngerFormBot
                  id={userId}
                  name={userName}
                  email={userEmail}
                  comments={UserComment}
                />
              }
            />
          </>
        ) : loggedCrud ? (
          <Route path="/crud" element={<CRUD />} />
        ) : (
          // Redirect to login if not authenticated
          <Route path="/*" element={<RouteGuard />} />
        )}
      </Routes>
    </div>
  );
}

export default App;

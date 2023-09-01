import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainMenu from "./components/MainMenu/mainMenu";
import AngerFormBot from "./components/surveyBot/angerFormBot";
import DepressionFormBot from "./components/surveyBot/depressionFormBot";
import AnxietyFormBot from "./components/surveyBot/anxietyFormBot";
import ConfidenceFormBot from "./components/surveyBot/confidenceFormBot";
import CRUD from "./CRUD";
import Login from "./components/Login/Login";
import { useMyContext } from "./MyContext"; // Import the context hook

function App() {
  const { loggedIn } = useMyContext(); // Access the loggedIn variable from the context

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
  if (!loggedIn) {
    // If not logged in, show the Login component
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
          />{" "}
        </Routes>
      </div>
    );
  }

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
        />{" "}
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
        <Route path="/crud" element={<CRUD />} />
      </Routes>
    </div>
  );
}

export default App;

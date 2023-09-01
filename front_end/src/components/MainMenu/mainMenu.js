import React from "react";
import "./mainMenu.css";
import TopBar from "../TopBar/topBar";
import Card from "../Card/card";
import form4 from "../../images/confidence.png";
import form1 from "../../images/anxiety2.png";
import form2 from "../../images/depression.png";
import form3 from "../../images/anger2.png";

function MainMenu() {
  return (
    <div>
      <TopBar />
      <div className="mainMenu">
        <div className="card-grid">
          <Card
            title="Self Esteem Screening Survey"
            link={{
              pathname: "/bot",
            }}
            logo={form4}
            logoSize="65px"
            height="56px"
            margin="10px"
          />
          <Card
            title="Anxiety Screening Survey"
            link={{
              pathname: "/new-page",
            }}
            logo={form1}
            logoSize="50px"
            height="50px"
            margin="10px"
          />
          <Card
            title="Depression Screening Survey"
            link={{
              pathname: "/new-page2",
            }}
            logo={form2}
            logoSize="50px"
            height="50px"
            margin="10px"
          />
          <Card
            title="Anger Screening Survey"
            link={{
              pathname: "/new-page3",
            }}
            logo={form3}
            logoSize="50px"
            height="50px"
            margin="10px"
          />
        </div>
      </div>
    </div>
  );
}

export default MainMenu;

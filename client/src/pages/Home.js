import React from "react";
import "../styles/Home.css";
import logoIcon from "../Images/ai.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputComponent from "../component/InputComponent";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="main__container">
        <div className="chat__container">
          <div className="header__container">
            <div className="logoTitle">
              <img src={logoIcon} className="aiImage" />{" "}
              <h5 className="title">DailyAI</h5>
            </div>
            <Button
              className="adminButton"
              onClick={() => {
                navigate("/admin");
              }}
            >
             
              Admin
            </Button>
          </div>
          <div className="borderDiv" />

          <InputComponent />
        </div>
      </div>
    </>
  );
}

export default Home;

import React, { useRef, useEffect } from "react";
import "../styles/Home.css";
import logoIcon from "../Images/ai.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputComponent from "../component/InputComponent";

function Home() {
  const navigate = useNavigate();
  const answersContainerRef = useRef(null); // Ref for the container holding the answers

  // Function to scroll to the bottom of the answers container
  const scrollToBottom = () => {
    console.log("Scrolling to bottom...");
    if (answersContainerRef.current) {
      answersContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };

  // Scroll to bottom when component updates (i.e., when a new answer is generated)
  useEffect(() => {
    console.log("Effect triggered!");
    scrollToBottom();
  }, []); // Make sure the effect runs only once after the initial render

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

          {/* This empty div serves as the target for scrolling */}
          <div ref={answersContainerRef} style={{ height: "10px", background: "red" }} />
        </div>
      </div>
    </>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import "../styles/Admin.css";
import { Button } from "react-bootstrap";
import dataIcon from "../Images/dataset-img.png";
import Instance from "../config/axiosInstance";
import apiURL from "../config/apiURL";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import statements...

function Admin() {
  const [trainingData, setTrainingData] = useState("");
  const [token, setToken] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = () => toast.success("Data Added Successfully!");
  const notifyError = (message) => toast.error(message);

  const submitData = async () => {
    setSubmitting(true);

    try {
      const data = { tdata: trainingData };
      const response = await Instance.post(apiURL.addData, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        notifySuccess();
        setTrainingData(""); // Clear textarea after successful submission
      } else {
        notifyError("Failed to add data. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        notifyError("Unauthorized access");
      } else {
        notifyError("An error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  return (
    <div className="mainContainer">
      <div className="header">

        <label className="combinedLogo"><img src={dataIcon} className="dataIcon" alt="Data Icon" />
        <p className="title">Data to train AI Model</p></label>
        
      </div>
      <textarea
        placeholder="Add Data to train"
        className="customTextarea"
        value={trainingData}
        onChange={(e) => setTrainingData(e.target.value)}
      ></textarea>
      <Button
        variant="dark"
        size="sm"
        className="submitButton"
        onClick={submitData}
       // Disable button when submitting or no data entered
      >
        {submitting ? "Submitting..." : "Submit"}
      </Button>
      <a href="/" className="anchorTag">Ask Questions</a>
      <ToastContainer />
    </div>
  );
}

export default Admin;

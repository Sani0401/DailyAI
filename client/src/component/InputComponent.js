import React, { useState } from "react";
import "../styles/inputComponent.css";
import imageIcon from "../Images/gandhijiImage.png";
import Instance from "../config/axiosInstance";
import apiUrl from "../config/apiURL";

function InputComponent() {
  const [query, setQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loadingAnswers, setLoadingAnswers] = useState([]); // State to track loading status for each answer

  const handleQuery = async () => {
    const questionIndex = questions.length; // Index of the current question

    setQuestions([...questions, query]);

    const searchQuery = {
      query: query,
    };

    setLoadingAnswers([...loadingAnswers, true]); // Set loading status for current answer

    try {
      const response = await Instance.post(apiUrl.getAnswer, searchQuery);
      setAnswers([...answers, response.data.response.response]); // Add the answer to the answers array
    } catch (error) {
      console.error("Error occurred while fetching answer:", error);
    }

    setLoadingAnswers((prevLoading) => {
      // Update loading status for the current question to false
      const updatedLoading = [...prevLoading];
      updatedLoading[questionIndex] = false;
      return updatedLoading;
    });
 
  };

  return (
    <>
      <div className="main__Container">
        <div className="questionAnswers">
          {questions.map((question, index) => (
            <div key={index} className="finalDiv">
              <label className="imageQuestions">
                <img src={imageIcon} className="imageIcon" alt="Gandhiji" />
                <p className="introWords">{question}</p>
              </label>
              {loadingAnswers[index] && <p>Loading...</p>}
              <p className="answer">{answers[index]}</p>
            </div>
          ))}
        </div>
      </div>

      <input
        placeholder="Ask questions here?"
        className="questionInput"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleQuery();
            setQuery("");
          }
        }}
      />
    </>
  );
}

export default InputComponent;

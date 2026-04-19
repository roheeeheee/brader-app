import { useState } from "react";
import "./Quiz.css";

function Quiz() {
  const quizData = [
    {
      question: "1. Who invented the Rubik’s Cube?",
      options: ["Albert Einstein", "Isaac Newton", "Ernő Rubik", "Nikola Tesla"],
      answer: 2
    },
    {
      question: "2. What is the main goal of solving a Rubik’s Cube?",
      options: [
        "Match random colors",
        "Make patterns on each side",
        "Turn the cube until each side has one color",
        "Finish it as fast as possible"
      ],
      answer: 2
    },
    {
      question: "3. Which cube is also called the Pocket Cube?",
      options: ["2×2 Cube", "4×4 Cube", "3×3 Cube", "5×5 Cube"],
      answer: 0
    },
    {
      question: "4. Which Rubik’s Cube is the most common in competitions?",
      options: ["2×2 Cube", "3×3 Cube", "4×4 Cube", "Megaminx"],
      answer: 1
    },
    {
      question: "5. Which puzzle can change shape while being scrambled?",
      options: ["2×2 Cube", "Pyraminx", "Skewb", "Square-1"],
      answer: 3
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [showScore, setShowScore] = useState(false);

  const currentData = quizData[currentQuestionIndex];

  const handleOptionClick = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null) return;

    if (selectedOptionIndex === currentData.answer) {
      setScore(score + 1);
      setResult("Correct!");
    } else {
      setResult(
        `Wrong! Correct answer: ${currentData.options[currentData.answer]}`
      );
    }

    setTimeout(() => {
      const next = currentQuestionIndex + 1;

      if (next < quizData.length) {
        setCurrentQuestionIndex(next);
        setSelectedOptionIndex(null);
        setResult("");
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  return (
    <div className="quiz-body">
      <div className="quiz-container">
        {showScore ? (
          <>
            <h2>Quiz Complete!</h2>
            <p>
              Your final score is {score} out of {quizData.length}
            </p>
          </>
        ) : (
          <>
            <h2>{currentData.question}</h2>

            <div className="options">
              {currentData.options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${
                    selectedOptionIndex === index ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                </div>
              ))}
            </div>

            <button
              className="quiz-btn"
              onClick={handleSubmit}
              disabled={selectedOptionIndex === null}
            >
              Submit Answer
            </button>

            <div className="result">{result}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;

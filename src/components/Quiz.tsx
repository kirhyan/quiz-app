import "../App.css";
import { Questions } from "../helpers/Questions";
import { useState, useContext, useEffect } from "react";
import { GameStateContext } from "../helpers/Contexts";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Questions.map(() => ""));

  const { setScore, setGameState } = useContext(GameStateContext);

  const currentAnswer = userAnswers[currentQuestion];

  const chooseOption = (option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = option;
    setUserAnswers(updatedAnswers);
  };

  // Recalcular score al cambiar respuestas
  useEffect(() => {
    const newScore = userAnswers.reduce((acc, answer, i) => {
      return answer === Questions[i].answer ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
  }, [userAnswers]);

  const nextQuestion = () => {
    if (currentQuestion + 1 < Questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState("finished");
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="quiz">
      <div className="headerQuestion">
        {currentQuestion > 0 && (
          <button onClick={prevQuestion} className="prevButton">
            ←
          </button>
        )}
        <h2 className="question">{Questions[currentQuestion].prompt}</h2>
      </div>

      <div className="answers">
        {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
          <button
            key={opt}
            className={currentAnswer === opt ? "selectedOption" : ""}
            onClick={() => chooseOption(opt)}
          >
            {Questions[currentQuestion][opt]}
          </button>
        ))}
      </div>

      <button
        className={
          currentQuestion === Questions.length - 1
            ? "finishQuiz"
            : "nextQuestion"
        }
        onClick={nextQuestion}
        disabled={!currentAnswer}
      >
        {currentQuestion === Questions.length - 1
          ? "Finish Quiz"
          : "Next Question"}
      </button>
    </div>
  );
}

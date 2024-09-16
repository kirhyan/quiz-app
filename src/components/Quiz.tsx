import "../App.css";
import { Questions } from "../helpers/Questions";
import { useState, useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  // const [prevQuestionCorrect, setPrevQuestionCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Questions.map(() => ""));

  const { score, setScore, gameState, setGameState } =
    useContext(GameStateContext);

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextQuestion = () => {
    /*     if (Questions[currentQuestion].answer === optionChosen) {
      setScore(score + 1);
    } */

    setUserAnswers(
      userAnswers.map((answer, idx) => {
        if (idx === currentQuestion) {
          return optionChosen;
        }
        return answer;
      })
    );

    setOptionChosen("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    /*     if (prevQuestionCorrect) {
      setScore(score - 1);
    } */
    setOptionChosen("");
    setCurrentQuestion(currentQuestion - 1);
  };

  const finishQuiz = () => {
    /*     if (Questions[currentQuestion].answer === optionChosen) {
      setScore(score + 1);
    } */
    nextQuestion();

    let sumScore = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      const answer = userAnswers[i];
      const correctAnswer = Questions[i].answer;
      if (answer === correctAnswer) {
        sumScore++;
      }
    }
    setScore(sumScore);
    setGameState("finished");
  };

  return (
    <div className="quiz">
      <div className="headerQuestion">
        {currentQuestion > 0 ? (
          <button onClick={prevQuestion} className="prevButton">
            ←
          </button>
        ) : null}

        <h2 className="question">{Questions[currentQuestion].prompt}</h2>
      </div>

      <div className="answers">
        <button
          className={optionChosen === "optionA" ? "selectedOption" : ""}
          onClick={() => {
            chooseOption("optionA");
          }}
        >
          {Questions[currentQuestion].optionA}
        </button>
        <button
          className={optionChosen === "optionB" ? "selectedOption" : ""}
          onClick={() => {
            chooseOption("optionB");
          }}
        >
          {Questions[currentQuestion].optionB}
        </button>
        <button
          className={optionChosen === "optionC" ? "selectedOption" : ""}
          onClick={() => {
            chooseOption("optionC");
          }}
        >
          {Questions[currentQuestion].optionC}
        </button>
        <button
          className={optionChosen === "optionD" ? "selectedOption" : ""}
          onClick={() => {
            chooseOption("optionD");
          }}
        >
          {Questions[currentQuestion].optionD}
        </button>
      </div>
      {currentQuestion === Questions.length - 1 ? (
        <button className="finishQuiz" onClick={finishQuiz}>
          Finish Quiz
        </button>
      ) : (
        <button className="nextQuestion" onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
}

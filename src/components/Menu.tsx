import "../App.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

export default function Menu() {
  const { gameState, setGameState, userName, setUserName, score, setScore } =
    useContext(GameStateContext);

  const handleStartQuiz = () => {
    if (userName.trim() === "") {
      alert("Please enter your name before starting the quiz.");
    } else {
      setGameState("playing");
      setScore(0);
    }
  };

  return (
    <div className="menu">
      <label htmlFor="username">Enter your name:</label>
      <input
        className="inputField"
        type="text"
        onKeyDown={(event) => {
          if (event.key === "Enter") handleStartQuiz();
        }}
        placeholder="Ex. Aitor Menta"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <button className="startButton" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

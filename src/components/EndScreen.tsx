import "../App.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";
import { Questions } from "../helpers/Questions";

export default function EndScreen() {
  const { gameState, setGameState, score, setScore } =
    useContext(GameStateContext);

  const tryAgain = () => {
    setGameState("menu");
    setScore(0);
  };

  return (
    <div className="endScreen">
      <div className="score">
        <h1>Score</h1>
        <h1>
          {score} / {Questions.length}
        </h1>
        <button onClick={tryAgain}>Try Again</button>
      </div>
    </div>
  );
}

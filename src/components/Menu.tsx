import "../App.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

export default function Menu() {
  const { gameState, setGameState, userName, setUserName, score, setScore } =
    useContext(GameStateContext);

  return (
    <div className="menu">
      <label>Enter your name:</label>
      <input
        type="text"
        onKeyDown={(event) => {
          if (event.keyCode === 13) setGameState("playing");
        }}
        placeholder="Ex. Aitor Menta"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setGameState("playing");
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}

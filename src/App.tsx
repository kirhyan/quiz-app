import "./App.css";
import Menu from "./components/Menu";
import { useState } from "react";
import { GameStateContext } from "./helpers/Contexts";
import Quiz from "./components/Quiz";
import EndScreen from "./components/EndScreen";

//['menu', 'playing', 'finished']
function App() {
  const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);

  const initialPage = () => {
    setScore(0);
    setGameState("menu");
  };

  return (
    <div className="app">
      <h1 className="initialPage" onClick={initialPage}>
        Quiz App
      </h1>
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          userName,
          setUserName,
          score,
          setScore,
        }}
      >
        {gameState === "menu" ? <Menu /> : null}
        {gameState === "playing" ? <Quiz /> : null}
        {gameState === "finished" ? <EndScreen /> : null}
      </GameStateContext.Provider>
    </div>
  );
}

export default App;

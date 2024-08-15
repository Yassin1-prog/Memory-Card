import { useState } from "react";
import "./App.css";
import Game from "./components/game.jsx";

function App() {
  const [highscore, setHighscore] = useState(0);
  const [tries, setTries] = useState(0);

  const again = (score) => {
    setTries(tries + 1);
    setHighscore(Math.max(highscore, score));
  };

  return (
    <>
      <div className="container">
        <div>{highscore}</div>
        <Game again={again} key={tries} />
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Game from "./components/game.jsx";
import Footer from "./components/footer.jsx";

function App() {
  const [highscore, setHighscore] = useState(() => {
    return localStorage.getItem("highscore") || 0;
  });
  const [tries, setTries] = useState(0);
  const [current, setCurrent] = useState(0);

  const again = (score) => {
    setTries(tries + 1);
    setCurrent(0);
    setHighscore(Math.max(highscore, score));
  };

  const moveScore = (score) => {
    localStorage.setItem("highscore", Math.max(highscore, score));
    setCurrent(score);
    setHighscore(Math.max(highscore, score));
  };

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <>
      <div className="header">
        <button className="home" onClick={handleRefresh}>
          <div className="imageHold">
            <img src="/lol.png" alt="League of Legends Logo" className="logo" />
          </div>
        </button>
        <div className="scoreboard">
          <div className="highscore">HIGH SCORE: {highscore}</div>
          <div className="score">Score: {current}</div>
        </div>
      </div>
      <div className="container">
        <Game again={again} moveScore={moveScore} key={tries} />
        <Footer />
      </div>
    </>
  );
}

export default App;

import "../styles/style.css";
import { useState, useEffect } from "react";
import Round from "./round.jsx";
import Losermodal from "./losermodal.jsx";
import Winnermodal from "./winnermodal.jsx";

const CHAMPION_LIST_URL =
  "https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json";

function pool(arr, num = 4) {
  const pickedElements = [];

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    const element = arr.splice(randomIndex, 1)[0];

    pickedElements.push(element);
  }

  return [arr, pickedElements];
}

export default function Game({ again, moveScore }) {
  const [loading, setLoading] = useState(true);
  const [champions, setChampions] = useState([]);
  const [players, setPlayers] = useState({});
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [lost, setLost] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    async function fetchAllChampions() {
      const response = await fetch(CHAMPION_LIST_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const res = pool(Object.keys(data.data), round * 4);
      let champs = Object.fromEntries(res[1].map((key) => [key, 0]));
      setChampions(res[0]);
      setLoading(false);
      setPlayers(champs);
      setRound(round + 1);
    }

    fetchAllChampions();
  }, []);

  const nxtLevel = () => {
    if (champions.length == 0) {
      setVictory(true);
    } else {
      const res = pool(champions, round * 4);
      let champs = Object.fromEntries(res[1].map((key) => [key, 0]));
      setChampions(res[0]);
      setPlayers(champs);
      setScore(score + 1);
      moveScore(score + 1);
      setRound(round + 1);
    }
  };

  const nxtStep = () => {
    moveScore(score + 1);
    setScore(score + 1);
  };

  const gameover = () => {
    setLost(true);
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="summonerRift">
          <Round
            players={players}
            moveOn={nxtLevel}
            success={nxtStep}
            gameover={gameover}
            key={round}
          />
        </div>
      )}
      {lost && <Losermodal score={score} again={again} />}
      {victory && <Winnermodal score={score} again={again} />}
    </>
  );
}

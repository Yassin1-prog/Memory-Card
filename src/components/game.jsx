import "../styles/style.css";
import { useState, useEffect } from "react";
import Round from "./round.jsx";

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

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [champions, setChampions] = useState([]);
  const [players, setPlayers] = useState({});
  const [round, setRound] = useState(1);

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
    const res = pool(champions, round * 4);
    let champs = Object.fromEntries(res[1].map((key) => [key, 0]));
    setChampions(res[0]);
    setPlayers(champs);
    setRound(round + 1);
  };

  console.log(loading);
  console.log(champions);
  console.log(players);
  console.log(round);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="summonerRift">
          <Round players={players} moveOn={nxtLevel} key={round} />
        </div>
      )}
    </>
  );
}

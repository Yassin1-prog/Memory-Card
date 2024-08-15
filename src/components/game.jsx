import "../styles/style.css";
import { useState, useEffect } from "react";
import Card from "./card.jsx";

const CHAMPION_LIST_URL =
  "https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json";

function pool(arr, num = 4) {
  const pickedElements = [];

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    const element = arr.splice(randomIndex, 1)[0];

    pickedElements.push(element);
  }

  return pickedElements;
}

function shuffleObject(obj) {
  const entries = Object.entries(obj);

  // if there is a small amount of champions
  if (entries.length < 9) {
    const entries2 = entries.map((_, index) => {
      const newIndex =
        (index + Math.floor(entries.length / 2)) % entries.length;
      return entries[newIndex];
    });
    return Object.fromEntries(entries2);
  }
  // Fisher-Yates shuffle algorithm
  else {
    for (let i = entries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [entries[i], entries[j]] = [entries[j], entries[i]];
    }
  }

  return Object.fromEntries(entries);
}

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [champions, setChampions] = useState([]);
  const [heroes, setHeroes] = useState({});
  const [lost, setLost] = useState(false);

  useEffect(() => {
    async function fetchAllChampions() {
      const response = await fetch(CHAMPION_LIST_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const res = pool(Object.keys(data.data), 4);
      let champs = Object.fromEntries(res.map((key) => [key, 0]));
      setChampions(Object.keys(data.data));
      setLoading(false);
      setHeroes(champs);
    }

    fetchAllChampions();
  }, []);

  const picked = (chosenChamp) => {
    let champs = heroes;
    champs[chosenChamp] == 1 ? setLost(true) : (champs[chosenChamp] += 1);
    champs = shuffleObject(champs);
    setHeroes(champs);
  };

  return (
    <>
      {loading || lost ? (
        <div>Hello, its either loading or you just lost</div>
      ) : (
        <div className="board">
          {Object.keys(heroes).map((hero) => (
            <Card champion={hero} chosen={picked} key={hero} />
          ))}
        </div>
      )}
    </>
  );
}

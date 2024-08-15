import "../styles/style.css";
import { useState, useEffect } from "react";
import Card from "./card.jsx";

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

export default function Round({ players, moveOn }) {
  const [lost, setLost] = useState(false);
  const [reborn, setReborn] = useState(players);

  const picked = (chosenChamp) => {
    let champs = reborn;
    champs[chosenChamp] += 1;
    if (Object.values(champs).some((value) => value > 1)) {
      setLost(true);
    }
    if (Object.values(champs).every((value) => value === 1)) {
      moveOn();
    }
    champs = shuffleObject(champs);
    setReborn(champs);
  };

  return (
    <>
      {lost ? (
        <div>Hello, its either loading or you just lost</div>
      ) : (
        <div className="board">
          {Object.keys(reborn).map((hero) => (
            <Card champion={hero} chosen={picked} key={hero} />
          ))}
        </div>
      )}
    </>
  );
}

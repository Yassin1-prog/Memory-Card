import "../styles/style.css";
import { useState, useEffect } from "react";
import Card from "./card.jsx";

const CHAMPION_LIST_URL =
  "https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json";

function pool(arr, num = 4) {
  // Create a new array to hold the picked elements
  const pickedElements = [];

  // Loop to pick 'num' random elements
  for (let i = 0; i < num; i++) {
    // Get a random index from the remaining elements
    const randomIndex = Math.floor(Math.random() * arr.length);

    // Remove the element at the random index and store it
    const element = arr.splice(randomIndex, 1)[0];

    // Add the picked element to the pickedElements array
    pickedElements.push(element);
  }

  // Return the array with the picked elements removed
  return [arr, pickedElements];
}

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [champions, setChampions] = useState([]);
  const [players, setPlayers] = useState([]);

  const champ = "Zac";

  useEffect(() => {
    async function fetchAllChampions() {
      const response = await fetch(CHAMPION_LIST_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(Object.keys(data.data));
      setChampions(Object.keys(data.data));
      setLoading(false);
    }

    // Call the function
    fetchAllChampions();
  }, []);

  return (
    <>
      {loading ? (
        <div>Hello</div>
      ) : (
        <div>
          <Card champion={champ} />
        </div>
      )}
    </>
  );
}

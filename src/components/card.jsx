import "../styles/style.css";
import { useState, useEffect } from "react";

export default function Card({ champion, chosen }) {
  const [loading, setLoading] = useState(true);
  const [splash, setSplash] = useState("");

  useEffect(() => {
    async function fetchSplash() {
      const url = `https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion/${champion}.json`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const skinId = data.data[champion].skins[0].num;
      const urlSplash = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${skinId}.jpg`;
      setSplash(urlSplash);
      setLoading(false);
    }

    // Call the function
    fetchSplash();
  }, []);

  return (
    <>
      {loading ? (
        <div>Bye</div>
      ) : (
        <button className="frame" onClick={() => chosen(champion)}>
          <div className="card">
            <img src={splash} alt="" className="image" />
            <div className="text">{champion}</div>
          </div>
        </button>
      )}
    </>
  );
}

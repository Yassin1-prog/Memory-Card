import "../styles/modal.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

// const cryJhin = 'https://api.giphy.com/v1/gifs/tQrJlriGulo7up5g3f?api_key=T30kebQo5u4qSPUOCzOPvri24dKUnxhs';
// the following doesnt always return jhin , so instead of using translate api i will use gif by id to get the specific one i want
// the id for the giph i want is tQrJlriGulo7up5g3f, api key remains the same
// const cry = `https://api.giphy.com/v1/gifs/translate?key=T30kebQo5u4qSPUOCzOPvri24dKUnxhs&s=Cry Me A River Lol GIF by League of Legends`;

export default function losermodal({ score, again }) {
  const [loading, setLoading] = useState(true);
  const [giphy, setGiphy] = useState("");

  useEffect(() => {
    async function fetchGif() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/tQrJlriGulo7up5g3f?api_key=T30kebQo5u4qSPUOCzOPvri24dKUnxhs"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const giph = await response.json();
      setGiphy(giph.data.images.original.url);
      setLoading(false);
    }

    fetchGif();
  }, []);

  return (
    <>
      <div className="losermodal">
        <div className="overlay"></div>
        <div className="losermodal-content">
          <div className="over">Game Over</div>
          <div className="score2">Score: {score}</div>
          {loading ? (
            <div>Loading.....</div>
          ) : (
            <div>
              <img src={giphy} className="giph" />
            </div>
          )}
          <button onClick={() => again(score)} className="restart">
            <FontAwesomeIcon icon={faRotateRight} /> Restart
          </button>
        </div>
      </div>
    </>
  );
}

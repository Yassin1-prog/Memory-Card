import "../styles/modal.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function winnermodal({ score, again }) {
  const [loading, setLoading] = useState(true);
  const [giphy, setGiphy] = useState("");

  useEffect(() => {
    async function fetchGif() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/tM76xlB5idOYRwB0wR?api_key=T30kebQo5u4qSPUOCzOPvri24dKUnxhs"
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
      <div className="winnermodal">
        <div className="overlay"></div>
        <div className="winnermodal-content">
          <div className="victory">Unbelievable Performance</div>
          <div className="score1">Score: {score}</div>
          {loading ? (
            <div>Loading.....</div>
          ) : (
            <div>
              <img src={giphy} className="giph" />
            </div>
          )}
          <button onClick={() => again(score)} className="playagain">
            <FontAwesomeIcon icon={faRotateRight} /> Play Again
          </button>
        </div>
      </div>
    </>
  );
}

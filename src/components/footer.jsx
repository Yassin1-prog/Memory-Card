import "../styles/style.css";
import { useRef, useState } from "react";
import Infomodal from "./infomodal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function footer() {
  // useRef to keep a reference to the audio element
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [help, setHelp] = useState(false);

  // Function to toggle play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleHelp = () => {
    setHelp(!help);
  };

  return (
    <div className="footer">
      <audio ref={audioRef} src="/relaxing-145038.mp3" preload="auto"></audio>
      <button onClick={toggleAudio} className="audio">
        {isPlaying ? (
          <FontAwesomeIcon icon={faVolumeHigh} className="sound" />
        ) : (
          <FontAwesomeIcon icon={faVolumeXmark} className="sound" />
        )}
      </button>
      <button className="help" onClick={toggleHelp}>
        <FontAwesomeIcon icon={faInfo} className="info" />
      </button>
      {help && <Infomodal close={toggleHelp} />}
    </div>
  );
}

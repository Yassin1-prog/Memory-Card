import "../styles/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye } from "@fortawesome/free-solid-svg-icons";

export default function losermodal({ close }) {
  return (
    <>
      <div className="infomodal">
        <div onClick={close} className="overlay"></div>
        <div className="infomodal-content">
          <h4>
            Welcome to Memory Cards - <span>League of Legends</span> Edition
          </h4>
          <p>
            <FontAwesomeIcon icon={faEye} />
            Your goal is to not pick the same champions twice in the same round,
            beat every round and a surprise will be waiting for you
          </p>
          <p>
            <FontAwesomeIcon icon={faEye} />
            If you wish to reload the page/restart the game you could press the
            logo on the top left corner
          </p>
          <button onClick={close} className="close">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  );
}

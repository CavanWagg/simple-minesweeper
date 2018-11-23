import React from "react";
import PropTypes from "prop-types";

const BoardHead = props => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60 || 0;
  let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  let time = `${minutes}:${formattedSeconds}`;

  // add status/smiley face???

  return (
    <div>
      <div className="board-head">
        <div className="flag-count">{props.flagsUsed}</div>
        <button className="reset" onClick={props.reset}>
          Reset
        </button>
        <div className="timer">{time}</div>
      </div>
    </div>
  );
};

BoardHead.propTypes = {
  time: PropTypes.number.isRequired,
  flagsUsed: PropTypes.number.isRequired
};

export default BoardHead;

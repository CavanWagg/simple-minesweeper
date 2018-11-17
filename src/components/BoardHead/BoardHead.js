import React from "react";

const BoardHead = props => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60 || 0;
  let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  let time = `${minutes}:${formattedSeconds}`;
  return (
    <div>
      <div className="board-time">
        <div className="timer">{time}</div>
      </div>
    </div>
  );
};

export default BoardHead;

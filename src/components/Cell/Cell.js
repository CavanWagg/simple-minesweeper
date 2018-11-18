import React from "react";

const Cell = props => {
  // console.log(props.data);
  let renderCell = () => {
    if (props.data.isOpen) {
      return (
        <div className="cell open" onClick={() => props.open(props.data)} />
      );
    } else {
      return <div className="cell" onClick={() => props.open(props.data)} />;
    }
  };
  return renderCell();
};

export default Cell;

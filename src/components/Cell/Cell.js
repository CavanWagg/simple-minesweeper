import React from "react";

const Cell = props => {
  console.log(props.data);
  let renderCell = () => {
    if (props.data.isOpen) {
      return <div className="cell open" />;
    } else {
      return <div className="cell" />;
    }
  };
  return renderCell();
};

export default Cell;

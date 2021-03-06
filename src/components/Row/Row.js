import React from "react";
import Cell from "../Cell/Cell";

const Row = props => {
  let cells = props.cells.map((data, index) => {
    return <Cell key={index} data={data} flag={props.flag} open={props.open} />;
  });
  // console.log(props);
  return <div className="row">{cells}</div>;
};

export default Row;

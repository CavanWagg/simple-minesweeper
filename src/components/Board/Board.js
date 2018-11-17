import React, { Component } from "react";
import Row from "../Row/Row.js";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.createBoard(props)
    };
  }

  createBoard = props => {
    let board = [];
    for (let i = 0; i < props.rows; i++) {
      board.push([]);

      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: i,
          y: j,
          // nearby mines
          count: 0,
          // cell clicked/unclicked
          isOpen: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }
    // after we create the board, add mines
    for (let i = 0; i < props.mines; i++) {
      // select a random row and column on the board and place a mine there until all mines have been placed
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomColumn = Math.floor(Math.random() * props.columns);
      let cell = board[randomRow][randomColumn];

      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
      // console.log(cell);
    }
    return board;
  };
  render() {
    let rows = this.state.rows.map((row, index) => {
      return <Row cells={row} key={index} />;
    });
    return <div className="board"> {rows}</div>;
  }
}

export default Board;

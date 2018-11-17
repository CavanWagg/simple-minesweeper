import React, { Component } from "react";
import Board from "./components/Board/Board.js";
import BoardHead from "./components/BoardHead/BoardHead";
class Minesweeper extends Component {
  state = {
    rows: 10,
    columns: 10,
    flags: 10,
    mines: 10,
    time: 0
  };

  render() {
    return (
      <div className="minesweeper">
        <BoardHead time={this.state.time} flagCount={this.state.flags} />
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
        />
      </div>
    );
  }
}

export default Minesweeper;

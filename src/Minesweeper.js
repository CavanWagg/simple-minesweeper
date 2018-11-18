import React, { Component } from "react";
import Board from "./components/Board/Board.js";
import BoardHead from "./components/BoardHead/BoardHead";
class Minesweeper extends Component {
  constructor() {
    super();
    this.intervals = [];
  }
  state = {
    status: "waiting", // waiting, running, end
    openCells: 0,
    rows: 10,
    columns: 10,
    flags: 10,
    mines: 10,
    time: 0
  };

  tick = () => {
    if (this.state.openCells > 0 && this.state.status === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.status !== "running") {
      this.setState(
        {
          status: "running"
        },
        () => {
          this.setInterval(this.tick, 1000);
        }
      );
    }
  };

  render() {
    return (
      <div className="minesweeper">
        <h1>Minesweeper</h1>
        <BoardHead time={this.state.time} flagCount={this.state.flags} />
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          openCellClick={this.handleCellClick}
        />
      </div>
    );
  }
}

export default Minesweeper;

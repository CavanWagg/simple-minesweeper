import React, { Component } from "react";
import Board from "./components/Board/Board.js";
import BoardHead from "./components/BoardHead/BoardHead";
class Minesweeper extends Component {
  constructor() {
    super();

    this.state = {
      status: "waiting", // waiting, running, end
      openCells: 0,
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      time: 0
    };

    this.baseState = this.state;
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === "running") {
      this.checkForWinner();
    }
  }
  checkForWinner = () => {
    if (
      this.state.mines + this.state.openCells >=
      this.state.rows * this.state.coumns
    ) {
      this.setState(
        {
          gameStatus: "winner"
        },
        alert("you won!")
      );
    }
  };

  componentWillMount() {
    this.intervals = [];
  }

  tick = () => {
    if (this.state.openCells > 0 && this.state.status === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intevals = [];
    });
  };

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.status !== "running") {
      this.setState(
        {
          gameStatus: "running"
        },
        this.setInterval(this.tick, 1000)
      );
    }
    this.setState(prevState => {
      return { openCells: prevState.openCells + 1 };
    });
  };

  changeFlagAmount = amount => {
    this.setState({ flagCount: this.state.flagCount + amount });
  };

  endGame = () => {
    this.setState({
      gameStatus: "ended"
    });
  };

  render() {
    return (
      <div className="minesweeper">
        <h1>Minesweeper</h1>
        <BoardHead
          time={this.state.time}
          reset={this.reset}
          status={this.state.gameStatus}
          flagsUsed={this.state.flags}
        />
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          endGame={this.endGame}
          status={this.state.gameStatus}
          openCellClick={this.handleCellClick}
          changeFlagAmount={this.changeFlagAmount}
        />
      </div>
    );
  }
}

export default Minesweeper;

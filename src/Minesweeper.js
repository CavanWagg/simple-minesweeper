import React, { Component } from "react";
import Board from "./components/Board/Board.js";
import BoardHead from "./components/BoardHead/BoardHead";
class Minesweeper extends Component {
  constructor() {
    super();

    this.state = {
      gameStatus: "waiting", // waiting, running, end
      openCells: 0,
      rows: 10,
      columns: 10,
      flagCount: 10,
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
      this.state.rows * this.state.columns
    ) {
      this.setState(
        {
          gameStatus: "winner"
        },
        alert(`Congratulations! you win! Time: ${this.state.time} seconds`)
      );
    }
  };

  componentWillMount() {
    this.intervals = [];
  }
  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };
  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intevals = [];
    });
  };

  tick = () => {
    if (this.state.openCells > 0 && this.state.gameStatus === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  endGame = () => {
    this.setState(
      {
        gameStatus: "ended"
      },
      alert(`Game Over, click the Reset button to start a new game`)
    );
  };

  changeFlagAmount = amount => {
    this.setState({ flagCount: this.state.flagCount + amount });
  };

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== "running") {
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

  render() {
    return (
      <div className="minesweeper">
        <h1 style={{ background: "#faa405" }}>Minesweeper </h1>
        <BoardHead
          time={this.state.time}
          reset={this.reset}
          gameStatus={this.state.gameStatus}
          flagsUsed={this.state.flagCount}
        />
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          endGame={this.endGame}
          gameStatus={this.state.gameStatus}
          handleCellClick={this.handleCellClick}
          changeFlagAmount={this.changeFlagAmount}
        />
      </div>
    );
  }
}

export default Minesweeper;

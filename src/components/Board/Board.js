import React, { Component } from "react";
import Row from "../Row/Row.js";

class Board extends Component {
  // constructor is used because we are initializing state
  constructor(props) {
    super(props);

    this.state = {
      rows: this.createBoard(props)
    };
  }
  // convert to memoization helper or some state
  componentWillReceiveProps(nextProps) {
    if (
      this.props.openCells > nextProps.openCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.createBoard(nextProps)
      });
    }
  }

  createBoard = props => {
    // create 2D grid based off # of columns and rows passed in from props
    let board = [];
    for (let i = 0; i < props.rows; i++) {
      board.push([]);

      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
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
        // if cell already has mine, loop back and select another random cell
        i--;
      } else {
        cell.hasMine = true;
      }
      // console.log(cell);
    }
    return board;
  };

  flag = cell => {
    if (this.props.status === "ended") {
      return;
    }
    let rows = this.state.rows;
    cell.hasFlag = !cell.hasFlag;
    this.setState({ rows });
    this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
  };

  // open cell
  open = cell => {
    let asyncCountMines = new Promise(resolve => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    asyncCountMines.then(numberOfMines => {
      let rows = this.state.rows;

      let current = rows[cell.y][cell.x];

      if (current.hasMine && this.props.openCells === 0) {
        console.log("cell has mine, restart!!!");
        let newRows = this.createBoard(this.props);
        this.setState(
          {
            rows: newRows
          },
          () => {
            this.open(cell);
          }
        );
      } else {
        if (!cell.hasFlag && !current.isOpen) {
          this.props.openCellClick();
          current.isOpen = true;
          current.count = numberOfMines;

          this.setState({ rows });

          if (!current.hasMine && numberOfMines === 0) {
            this.findAroundCell(cell);
          }

          // console.log(this.state.rows);
        }
      }
    });
  };

  findMines = cell => {
    let minesInProximity = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        // position must be positive x and y value
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          // check if cell is valid to our board
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            // check if cell has a mine or not
            if (
              this.state.rows[cell.y + row][cell.x + col].hasMine &&
              !(row === 0 && col === 0)
            ) {
              minesInProximity++;
            }
          }
        }
      }
    }
    return minesInProximity;
  };

  findAroundCell = cell => {
    let rows = this.state.rows;

    // go through each cell and open cells one by one until we find one with a mine.
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        // position must be positive x and y value
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          // check if cell is valid to our board
          if (cell.y + row < rows.length && cell.x + col < rows[0].length) {
            if (
              !rows[cell.y + row][cell.x + col].hasMine &&
              !rows[cell.y + row][cell.x + col].isOpen
            ) {
              this.open(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  };

  render() {
    let rows = this.state.rows.map((row, index) => {
      return <Row cells={row} key={index} open={this.open} />;
    });
    return <div className="board"> {rows}</div>;
  }
}

export default Board;

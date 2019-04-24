import React from "react";
import "./App.css";
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(gridValue, squareShade) {
    return (
      <Square
        piece={this.props.squares[gridValue]}
        image={
          this.props.squares[gridValue]
            ? this.props.squares[gridValue].image
            : null
        }
        shade={squareShade}
        selected={
          this.props.squares[gridValue]
            ? this.props.squares[gridValue].selected
            : null
        }
        onClick={() => this.props.onClick(gridValue)}
      />
    );
  }

  render() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const squareShade =
          (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
            ? "light"
            : "dark";
        squareRows.push(this.renderSquare(i * 8 + j, squareShade));
      }
      board.push(<div>{squareRows}</div>);
    }

    return <div>{board}</div>;
  }
}

function isEven(num) {
  return num % 2 === 0;
}

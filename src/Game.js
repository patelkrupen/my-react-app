import React from "react";
import "./App.css";
import Board from "./Board.js";
import initialCheckersBoard from "./initializeGame.js";
import RedKing from "./images/redcrown.png";
import BlackKing from "./images/blackcrown.png";
import KingPiece from "./KingPiece";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialCheckersBoard(),
      player: 1,
      status: "Select your piece to move.",
      sourceSelection: -1,
      turn: "red"
    };
  }

  handleClick(i) {
    const sq = this.state.squares.slice(); // copy squares
    const play = this.state.player; // current player
    const t = this.state.turn; // current turn color

    // Already selected a source piece to move.
    if (this.state.sourceSelection >= 0) {
      sq[this.state.sourceSelection].selected = false; // remove highlight from selected box

      /* Check if the move is possible. */
      const getRet = sq[this.state.sourceSelection].isMovePossible(
        this.state.sourceSelection,
        i,
        this.state.player,
        sq
      );

      if (getRet.capture) {
        delete sq[getRet.coord]; // remove piece to capture
      }

      if (getRet.isMovePossible) {
        /* Move the piece. */
        sq[i] = sq[this.state.sourceSelection];
        sq[this.state.sourceSelection] = null;
        this.setState({
          sourceSelection: -1,
          player: play === 1 ? 2 : 1,
          squares: sq,
          status: "Select your piece to move.",
          turn: t === "red" ? "black" : "red"
        });
        isKingPiece(sq, play);
      } else {
        this.setState({
          sourceSelection: -1,
          status: "This move is not possible."
        });
      }
      return;
    }

    // Source piece selected.
    if (sq[i] && sq[i].player === this.state.player) {
      sq[i].selected = true; // highlight the box
      this.setState({
        sourceSelection: i,
        status: "Select your destination.",
        squares: sq
      });
    } else {
      // Invalid piece to move.
      this.setState({
        status: "Select your piece to move."
      });
    }
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
        </div>
        <div className="game-info">
          <h2>Turn</h2>
          <div
            id="player-turn-box"
            style={{ backgroundColor: this.state.turn }}
          />
          <div className="game-status">{this.state.status}</div>
        </div>
      </div>
    );
  }
}

function isKingPiece(sq, play) {
  if (play === 1) {
    for (var x = 56; x < 64; x++) {
      if (sq[x] && sq[x].player === play && !sq[x].isKing) {
        delete sq[x];
        sq[x] = new KingPiece(1, RedKing);
      }
    }
  } else {
    for (var x = 0; x < 8; x++) {
      if (sq[x] && sq[x].player === play && !sq[x].isKing) {
        delete sq[x];
        sq[x] = new KingPiece(2, BlackKing);
      }
    }
  }
}

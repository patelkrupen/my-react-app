import Piece from "./Piece.js";
import RedPiece from "./images/redpiece.png";
import BlackPiece from "./images/blackpiece.png";

export default function initializeGame() {
  const squares = Array(64).fill(null);
  const len = 8;
  for (let x = 0; x < len; x++) {
    if (x === 0 || x === 2) {
      for (let y = 1; y < len; y += 2) {
        squares[x * 8 + y] = new Piece(1, RedPiece);
      }
    } else if (x === 1) {
      for (let y = 0; y < len; y += 2) {
        squares[x * 8 + y] = new Piece(1, RedPiece);
      }
    } else if (x === 5 || x === 7) {
      for (let y = 0; y < len; y += 2) {
        squares[x * 8 + y] = new Piece(2, BlackPiece);
      }
    } else if (x === 6) {
      for (let y = 1; y < len; y += 2) {
        squares[x * 8 + y] = new Piece(2, BlackPiece);
      }
    }
  }
  return squares;
}

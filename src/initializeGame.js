import Piece from './Piece.js';

export default function initializeGame() {
    const squares = Array(64).fill(null);
    
    const len = 8;
    
    const red = 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg';
    const black = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';
		
		for (let x = 0; x < len; x++) {
			if (x === 0 || x === 2) {
					for (let y = 1; y < len; y += 2) {
							squares[x * 8 + y] = new Piece(1, red);
					}
			} else if (x === 1) {
					for (let y = 0; y < len; y += 2) {
							squares[x * 8 + y] = new Piece(1, red);
					}
			} else if (x === 5 || x === 7) {
					for (let y = 0; y < len; y += 2) {
							squares[x * 8 + y] = new Piece(2, black);
					}
			} else if (x === 6) {
					for (let y = 1; y < len; y += 2) {
							squares[x * 8 + y] = new Piece(2, black);
					}
			}
	}
    
    return squares;
}
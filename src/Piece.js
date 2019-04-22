export default class Piece {
    constructor(player, icon) {
        this.player = player; // can be 1 or 2 for red and black
        this.style = icon;
    }

    isMovePossible(src, dest) {
        const sourceRow = Math.floor(src / 8);
        const sourceCol = src - sourceRow * 8;
        const destRow = Math.floor(dest / 8);
        const destCol = dest - destRow * 8;
        if(this.player === 1) {
            if(destRow-sourceRow === 1 && (sourceCol - 1 === destCol || sourceCol + 1 === destCol)) {
                return true;
            } else {
                return false;
            }
        } else {
            if(sourceRow-destRow === 1 && (sourceCol - 1 === destCol || sourceCol + 1 === destCol)) {
                return true;
            } else {
                return false;
            }
        }
    }
}
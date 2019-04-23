export default class Piece {
    constructor(player, icon) {
        this.player = player; // can be 1 or 2 for red and black respectively
        this.image = icon; // image to hold
        this.selected = false; // highlight true if selected
    }

    isMovePossible(src, dest, player, sq) {
        // Calculate coordinates of source and destination value, easier to work with.
        const sourceRow = Math.floor(src / 8);
        const sourceCol = src - sourceRow * 8;
        const destRow = Math.floor(dest / 8);
        const destCol = dest - destRow * 8;

        const oppPlayer = player === 1 ? 2 : 1; // opposite player

        if(player === 1) {
            if(destRow - sourceRow === 1 && (sourceCol - 1 === destCol || sourceCol + 1 === destCol) && !sq[dest]) {
                var ret = {capture: false, coord: 0, isMovePossible: true};
                return ret;
            } else if (destRow - sourceRow === 2 && (sourceCol + 2 === destCol || sourceCol - 2 === destCol) && !sq[dest]) {
                if(sourceCol === 0) {
                    if (sq[src + 9] && sq[src + 9].player === oppPlayer) {
                        var ret = {capture: true, coord: src+9, isMovePossible: true};
                        return ret;
                    } 
                } else if (sourceCol === 7) {
                    if(sq[src + 7] && sq[src + 7].player === oppPlayer) {
                        var ret = {capture: true, coord: src+7, isMovePossible: true};
                        return ret;
                    }
                } else {
                    if(sourceCol > destCol) {
                        if(sq[src + 7] && sq[src + 7].player === oppPlayer){
                            var ret = {capture: true, coord: src+7, isMovePossible: true};
                            return ret;
                        }
                    } else {
                        if(sq[src + 9] && sq[src + 9].player === oppPlayer){
                            var ret = {capture: true, coord: src+9, isMovePossible: true};
                            return ret;
                        }
                    }
                }
            } else {
                var ret = {capture: false, coord: 0, isMovePossible: false};
                return ret;
            }
        } else {
            if(sourceRow - destRow === 1 && (sourceCol - 1 === destCol || sourceCol + 1 === destCol) && !sq[dest]) {
                var ret = {capture: false, coord: 0, isMovePossible: true};
                return ret;
            } else if(sourceRow - destRow === 2 && (sourceCol + 2 === destCol || sourceCol - 2 === destCol) && !sq[dest]) {
                if(sourceCol === 0) {
                    if (sq[src - 7] && sq[src - 7].player === oppPlayer) {
                        var ret = {capture: true, coord: src-7, isMovePossible: true};
                        return ret;
                    }
                } else if (sourceCol === 7) {
                    if(sq[src - 9] && sq[src - 9].player === oppPlayer) {
                        var ret = {capture: true, coord: src-9, isMovePossible: true};
                        return ret;
                    }
                } else {
                    if(sourceCol > destCol) {
                        if(sq[src - 9] && sq[src - 9].player === oppPlayer) {
                            var ret = {capture: true, coord: src-9, isMovePossible: true};
                            return ret;
                        }
                    } else {
                        if(sq[src - 7] && sq[src - 7].player === oppPlayer){
                            var ret = {capture: true, coord: src-7, isMovePossible: true};
                            return ret;
                        }
                    }
                }
            } else {
                var ret = {capture: false, coord: 0, isMovePossible: false};
                return ret;
            }
        }
        var ret = {capture: false, coord: 0, isMovePossible: false};
        return ret;
    }
}
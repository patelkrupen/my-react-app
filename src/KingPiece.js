export default class KingPiece {
    constructor(player, icon) {
        this.player = player; // can be 1 or 2 for red and black respectively
        this.image = icon; // image to hold
        this.selected = false; // highlight true if selected
        this.isKing = true;
    }

    isMovePossible() {

    }
}
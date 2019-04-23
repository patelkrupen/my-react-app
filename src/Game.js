import React from 'react';
import './App.css';
import Board from './Board.js';
import initialCheckersBoard from './initializeGame.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: initialCheckersBoard(),
            player: 1,
            status: '',
            sourceSelection: -1,
        }
    }

    handleClick(i) {
        const sq = this.state.squares.slice();
        const play = this.state.player;
        // const colorPiece = play === 1 ? 'red' : 'black'; 

        if(this.state.sourceSelection >= 0) {
            sq[this.state.sourceSelection].selected = false;
            if(checkCapture(this.state.sourceSelection, i, this.state.player, sq) || sq[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, sq)) {
                sq[i] = sq[this.state.sourceSelection];
                sq[this.state.sourceSelection] = null;
                this.setState({
                    sourceSelection: -1,
                    player: play === 1 ? 2 : 1,
                    squares: sq,
                    status: ''
                });
            } else {
                this.setState({
                    sourceSelection: -1,
                    status: 'This move is not possible.'
                });
            }
            return;
        }

        if(sq[i] && sq[i].player === this.state.player) {
            sq[i].selected = true;
            this.setState({
                sourceSelection : i,
                status: 'Select your destination.',
                squares: sq
            });
        } else {
            this.setState({
                status: 'Select your piece to move.'
            });
        }
    }

    render() {
        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board
                        squares = {this.state.squares}
                        onClick = {(i) => this.handleClick(i)}
                        />
                    </div>
                </div>
                <div className="helper">
                    <p>{this.state.status}</p>
                </div>
            </div>
        );
    }
}

function checkCapture(src, dest, player, sq) {
    const sourceRow = Math.floor(src / 8);
    const sourceCol = src - sourceRow * 8;
    const destRow = Math.floor(dest / 8);
    const destCol = dest - destRow * 8;
    const oppPlayer = player === 1 ? 2 : 1;
    if(player === 1) {
        if(destRow - sourceRow === 2 && (sourceCol + 2 === destCol || sourceCol - 2 === destCol)) {
            if(sourceCol === 0) {
                if (sq[src + 9] && sq[src + 9].player === oppPlayer) {
                    delete sq[src+9];
                    return true;
                } 
            } else if (sourceCol === 7) {
                if(sq[src + 7] && sq[src + 7].player === oppPlayer) {
                    delete sq[src+7];
                    return true;
                }
            } else {
                if(sourceCol > destCol) {
                    if(sq[src + 7] && sq[src + 7].player === oppPlayer){
                        delete sq[src+7];
                        return true;
                    }
                } else {
                    if(sq[src + 9] && sq[src + 9].player === oppPlayer){
                        delete sq[src+9];
                        return true;
                    }
                }
            }
        }
    } else {
        if(sourceRow - destRow === 2 && (sourceCol + 2 === destCol || sourceCol - 2 === destCol)) {
            if(sourceCol === 0) {
                if (sq[src - 7] && sq[src - 7].player === oppPlayer) {
                    delete sq[src-7];
                    return true;
                } 
            } else if (sourceCol === 7) {
                if(sq[src - 9] && sq[src - 9].player === oppPlayer) {
                    delete sq[src-9];
                    return true;
                }
            } else {
                if(sourceCol > destCol) {
                    if(sq[src - 9] && sq[src - 9].player === oppPlayer) {
                        delete sq[src-9];
                        return true;
                    }
                } else {
                    if(sq[src - 7] && sq[src - 7].player === oppPlayer){
                        delete sq[src-7];
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
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
        const colorPiece = play === 1 ? 'red' : 'black'; 

        if(this.state.sourceSelection >= 0) {
            if(sq[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i)) {
                // alert('move possible');
                sq[i] = sq[this.state.sourceSelection];
                sq[this.state.sourceSelection] = null;
                this.setState({
                    sourceSelection: -1,
                    player: play === 1 ? 2 : 1,
                    squares: sq
                });
            } else {
                // alert('move not possible');
                this.setState({
                    sourceSelection: -1,
                });
            }
            return;
        }

        if(!sq[i]) {
            alert('Choose your piece.');
        } else {
            if(sq[i].player !== this.state.player) {
                alert("Choose your own piece.");
            } else {
                // Chose the right piece!
                // alert(this.state.player + " " + i);
                this.setState({
                    sourceSelection : i
                });
            }
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
            </div>
        );
    }
}
import React, {Fragment, useReducer} from 'react';
import Board from './Board';
import "./game.css";

const Game = () => {
    const winner = null;
    const xIsNext = undefined;
    const status = winner? winner === 'D'? 'Draw': 'Winner is ' + winner
                            : 'Next player is ' + (xIsNext ? 'X' : 'O');
    const moves = (
        <li>
            <button> Start the Game!</button>
        </li>
    )
    const squares = Array(9).fill(null);
    return (
        <Fragment>
            <div className="game card">
                <div className="game-board">
                    <Board squares={squares}></Board>                
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        </Fragment>
    )
}

export default Game;


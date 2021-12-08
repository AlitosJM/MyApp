import React, {Fragment, useReducer} from 'react';
import Board from './Board';
import "./game.css";

const reducer = (state, action) => {
    switch (action.type) {
        case 'MOVE':
            return {
                ...state,
                history: state.history.concat({
                    squares: action.payload.squares,
                }),
                xIsNext: !state.xIsNext,
            };
        case 'JUMP':
            return {
                ...state,
                xIsNext: action.payload.step % 2 === 0, //even (par)step => true X is next
                history: state.history.slice(0, action.payload.step + 1),
            };
        default:
            return state;
    }
}

const Game = () => {
    const [state, dispatch] = useReducer(reducer, {
        xIsNext: true,
        history: [{ squares: Array(9).fill(null) }],
    });
    const { xIsNext, history } = state;

    console.log(history);
    
    // const jumpTo = (step) => { }
    const jumpTo = (step) => (event) => {
        dispatch({ type: 'JUMP', payload: { step } });
    };

    const handleClick = (i) => {
        const current = history[history.length - 1]; // history.length - 1 equal to the last index
        const squares = current.squares.slice(); // copy of current.square array
        const copy_squares = [...current.squares];
        const winner = calculateWinner(squares);

        console.log("copy_squares: ", copy_squares);

        // console.log("squares.slice() ", squares, "[...squares] ", copy_squares)

        if (winner || squares[i]) return;
          
        squares[i] = xIsNext ? 'X' : 'O';
        dispatch({ type: 'MOVE', payload: { squares } });
    }

    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);


    const status = winner? winner === 'D'? 'Draw': 'Winner is ' + winner
                            : 'Next player is ' + (xIsNext ? 'X' : 'O');
    
    const moves = history.map((step, move) => {
        console.log("move ", move);
        const desc = move ? 'Go to #' + move : 'Start the Game';
        return <li key={move}>
                    <button onClick={jumpTo(move)}>{desc}</button>
                    {/* <button onClick={() => jumpTo(move)}>{desc}</button> */}
                </li>        
    });
    // const squares = Array(9).fill(null);
    return (
        <Fragment>
            <div className={winner ? 'game disabled' : 'game'}>
                <div className="game-board">
                    <Board onClick={(i) => handleClick(i)} squares={current.squares}></Board>                
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul className="noline">{moves}</ul>
                </div>
            </div>
        </Fragment>
    )
}

const calculateWinner = (squares) => {
    let isDraw = true;
    const winnerLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winnerLines.length; i++) {
        const [a, b, c] = winnerLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
        if (!squares[a] || !squares[b] || !squares[c]) {
            isDraw = false;
        }
    }
    if (isDraw) return 'D';
    return null;
}

export default Game;


import React from 'react';
import Cell from './Cell';

interface BoardProps {
  board: number[][]; // Current state of the Sudoku board
  setBoard: (row: number, col: number, value: number) => void; // Function to update the board state
}

const Board: React.FC<BoardProps> = ({ board, setBoard }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              row={rowIndex}
              col={colIndex}
              onChange={setBoard}
              isReadonly={cell !== 0}  // If the cell has a value (non-zero), it is readonly
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;

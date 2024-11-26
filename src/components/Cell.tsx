import React from 'react';

interface CellProps {
  value: number; // The current value in the cell
  row: number;   // Row index of the cell
  col: number;   // Column index of the cell
  onChange: (row: number, col: number, value: number) => void; // Function to handle board update
  isReadonly: boolean; // Whether the cell is pre-filled or editable
}

const Cell: React.FC<CellProps> = ({ value, row, col, onChange, isReadonly }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    // Allow number between 1 and 9, or 0 to clear the value
    if (newValue >= 1 && newValue <= 9 || newValue === 0) {
      onChange(row, col, newValue); // Update the board with the new value
    }
  };

  return (
    <div className="cell">
      <input
        type="text"
        value={value === 0 ? '' : value} // Display an empty string for empty cells (value === 0)
        onChange={handleInputChange}
        disabled={isReadonly} // Disable the input for pre-filled cells
        maxLength={1} // Only allow one digit
      />
    </div>
  );
};

export default Cell;

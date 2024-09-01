import React, { useCallback, useState } from 'react';

const SelectableGrid = ({ rows = 10, cols = 10 }) => {
    const [grid, setGrid] = useState(Array.from({ length: rows * cols }, (_, index) => index + 1));
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startBox, setStartBox] = useState(null); // Track the starting box for selection

    // Handle mouse down to enable selection
    const handleMouseDown = (boxNumber) => {
        setStartBox(boxNumber);
        setSelectedBoxes([boxNumber]);
        setIsSelecting(true);
    };

    // Handle mouse up to disable selection
    const handleMouseUp = () => {
        setIsSelecting(false);
        setStartBox(null); // Reset start box
    };

    const handleMouseEnter = useCallback((boxNumber) => {
        if (isSelecting && startBox !== null) {
            const start = Math.min(startBox, boxNumber);
            const end = Math.max(startBox, boxNumber);

            const startRow = Math.floor((start - 1) / cols);
            const endRow = Math.floor((end - 1) / cols);
            const startCol = (start - 1) % cols;
            const endCol = (end - 1) % cols;

            const minRow = Math.min(startRow, endRow);
            const minCol = Math.min(startCol, endCol);
            const maxRow = Math.max(startRow, endRow);
            const maxCol = Math.max(startCol, endCol);

            let selected = [];

            for (let i = minRow; i <= maxRow; i++) {
                for (let j = minCol; j <= maxCol; j++) {
                    selected.push(i * cols + j + 1);
                }
            }

            setSelectedBoxes(selected);
        }
    }, [isSelecting, startBox, cols]);

    return (
        <div
            className={`Container mx-auto grid gap-1 select-none`}
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            onMouseUp={handleMouseUp} // Moved to div level
        >
            {
                grid.map((gridItem, index) => (
                    <div
                        key={index}
                        className={`flex justify-center items-center border-2 border-black ${selectedBoxes.includes(index + 1) ? "selected" : ""}`}
                        onMouseEnter={() => handleMouseEnter(index + 1)}
                        onMouseDown={() => handleMouseDown(index + 1)}
                    >
                        {gridItem}
                    </div>
                ))
            }
        </div>
    );
};

export default SelectableGrid;

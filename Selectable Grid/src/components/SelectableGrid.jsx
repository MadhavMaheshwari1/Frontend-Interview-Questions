// eslint-disable-next-line no-unused-vars
import React, { useCallback, useState } from 'react';
const SelectableGrid = ({ rows = 10, cols = 10 }) => {
    const [grid, setGrid] = useState(Array.from({ length: rows * cols }, (_, index) => index + 1));
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

    // Handle mouse down to enable selection
    const handleMouseDown = (boxNumber) => {
        setSelectedBoxes([boxNumber]);
        setIsSelected(true);
    };

    // Handle mouse up to disable selection
    const handleMouseUp = () => {
        setIsSelected(false);
    };

    // Handle mouse enter to update hovered index
    const handleMouseEnter = useCallback((boxNumber) => {
        if (isSelected) {
            const startBox = selectedBoxes[0];
            const endBox = boxNumber;

            const startRow = (startBox - 1) / cols;
            const endRow = (endBox - 1) / cols;
            const startCol = (startBox - 1) % cols;
            const endCol = (endBox - 1) % cols;

            const minRow = Math.min(startRow, endRow);
            const minCol = Math.min(startCol, endCol);
            const maxRow = Math.min(startRow, endRow);
            const maxCol = Math.min(startCol, endCol);

            let selected = [];

            for (let i = minRow; i <= maxRow; i++) {
                for (let j = minCol; j <= maxCol; j++) {
                    selected.push(i * j + 1);
                }
            }
            setIsSelected(selected);
        }
    }, [isSelected]);

    // Handle mouse leave to reset hovered index
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div
            className='Container mx-auto grid grid-cols-10 gap-1 select-none'
        >
            {
                grid.map((gridItem, index) => {
                    return (
                        <div
                            key={index}
                            className='flex justify-center items-center border-2 border-black '
                            onMouseEnter={() => handleMouseEnter(index + 1)}
                            onMouseDown={() => handleMouseDown(index + 1)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                        >
                            {gridItem}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default SelectableGrid;

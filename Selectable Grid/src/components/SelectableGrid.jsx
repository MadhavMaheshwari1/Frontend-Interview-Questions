import React from 'react'
import { useState } from 'react'

const SelectableGrid = () => {

    const [grid, setGrid] = useState(Array.from({ length: 30 }, (_, index) => index + 1));

    return (
        <div className='Container mx-auto grid grid-cols-5'>
            {
                grid.map((gridItem, index) => {
                    return <div key={index}>{gridItem}</div>;
                })
            }

        </div>
    )
}

export default SelectableGrid
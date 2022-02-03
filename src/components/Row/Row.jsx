import React from 'react'
import { Cell } from '../Cell'

const Row = ({
    cells,
    open,
    status
}) => {
    return (
        <div className="row">
            {cells.map((cell, i) => {
                return <Cell data={cell} key={i} open={open} status={status}/>
            })}
        </div>
    )
}

export default Row

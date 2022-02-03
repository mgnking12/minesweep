import React from 'react'
import { Row } from '../Row'

const Grid = ({
    createdRows,
    open,
    status
}) => {
    return (
        <div className="grid">
            {
                createdRows && createdRows.map((row, i) => {
                    return (
                        <Row
                            status={status}
                            cells={row}
                            open={open}
                            key={i} />
                    )
                })
            }
        </div>
    )
}

export default Grid
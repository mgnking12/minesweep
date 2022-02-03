import React from 'react'
import classNames from 'classnames'

const Cell = ({
    data,
    open,
    status
}) => {

    const cellClassNames = classNames('cell', {
        'cell--isOpen': data.isOpen,
        'cell--hasMine': data.hasMine && (data.isOpen || status === 'lost')
    })

    return (
        <div className={cellClassNames} onClick={() => {
                open(data)
            }}>
            {(data.count > 0) && data.count}
        </div>
    )
}

export default Cell

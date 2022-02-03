import React, { useEffect, useState } from 'react'
import { Grid } from '../Grid'

const Game = ({
    rows = 10,
    columns = 10,
    mines = 20
}) => {

    const [createdRows, setCreatedRows] = useState()
    const [status, setStatus] = useState('waiting') // waiting, running, won, lost
    const [openCells, setOpenCells] = useState(0)

    const createGrid = () => {
        let grid = []
        for (let i = 0; i < rows; i++) {
            grid.push([])
            for (let j = 0; j < columns; j++) {
                grid[i].push({
                    // what col this specific box is in
                    x: j,
                    // what row this specific box is in 
                    y: i,
                    // number of nearby mines
                    count: 0,
                    isOpen: false,
                    hasMine: false
                })
            }
        }

        for (let i = 0; i < mines; i++) {
            let randomRow = Math.floor(Math.random() * rows)
            let randomCol = Math.floor(Math.random() * columns)

            let cell = grid[randomRow][randomCol]

            if (cell.hasMine) {
                i--
            } else {
                cell.hasMine = true
            }
        }
        return grid
    }

    const recentlyCreatedRows = createGrid()

    useEffect(() => {
        setCreatedRows(recentlyCreatedRows)
    }, [])

    const handleCellClick = () => {
        if(openCells === 0 && status !== 'running') {
            setStatus('running')
        }

        setOpenCells(openCells + 1)
    }

    const open = (cell) => {
            if(status === 'lost') return
            let minesAround = findMines(cell)

            // row is y, col is X
            let currentCell = createdRows[cell.y][cell.x]

            if(currentCell.hasMine) {
                handleCellClick()
                currentCell.isOpen = true
                setStatus('lost')
            } 
            if(!cell.hasMine && !currentCell.isOpen) {
                handleCellClick()

                currentCell.isOpen = true
                currentCell.count = minesAround

                if(!currentCell.hasMine && minesAround === 0) {
                    findAround(cell)
                }

            }

        
    }

    const findMines = (cell) => {
        let minesAround = 0

        for(let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                // if our row position plus row is greater than 0 & col pos + col > 0, to make sure it isn't on edge
                if(cell.y + row >= 0 && cell.x + col >= 0) {
                    //  make sure cell is inside the board
                    if(cell.y + row < createdRows.length && cell.x + col < createdRows[0].length) {
                        // if the cell that we are currently looking at has a mine
                        if(createdRows[cell.y + row][cell.x + col].hasMine && !(row === 0 && col === 0)) {
                            minesAround++
                        }
                    }
                }
            }
        }
        return minesAround
    }

    const findAround = (cell) => {
        // go thru cells and open each one
        for(let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if(cell.y + row >= 0 && cell.x + col >= 0) {
                    //  make sure cell is inside the board
                    if(cell.y + row < createdRows.length && cell.x + col < createdRows[0].length) {
                        if(!createdRows[cell.y + row][cell.x + col].hasMine && !createdRows[cell.y + row][cell.x + col].isOpen) {
                            open(createdRows[cell.y + row][cell.x + col])
                        }
                        }
                    }
                }
            }
        }
    

    return (
        <div className="board">
            <Grid
            status={status}
            createdRows={createdRows}
            open={open}/>
            <button onClick={() => {
                const newRows = createGrid()
                setCreatedRows(newRows)
                setStatus('running')
            }}>Start Over</button>

            {status === 'lost' && 'oh no, game over'}
        </div>
    )
}
export default Game

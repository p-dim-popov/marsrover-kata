import React from "react";
import {Grid} from "../../features/Grid/Grid";

export interface IBoardProps {
    grid: Grid;
}

const Board: React.FC<IBoardProps> = (props) => {
    return (
        <>
            {
                Array(props.grid.rows).fill(null)
                    .map((x, row) => Array(props.grid.cols).fill(null)
                        .map((z, col) => (<div key={`${row}-${col}`}>{`${row}-${col}`}</div>)))
            }
        </>
    );
}

export default Board;
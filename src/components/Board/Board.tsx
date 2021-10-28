import React from "react";
import {Grid} from "../../features/Grid/Grid";

export interface IBoardProps {
    grid: Grid;
}

const Board: React.FC<IBoardProps> = (props) => {
    return (
        <div className="flex">
            {
                Array(props.grid.rows).fill(null)
                    .map((x, row) => (
                            <div key={`r_${row}`} className="flex-row">
                                {
                                    Array(props.grid.cols).fill(null)
                                        .map((z, col) => (
                                                <div key={`e_${row}_${col}`}>{`${row}-${col}`}</div>
                                            )
                                        )
                                }
                            </div>
                        )
                    )
            }
        </div>
    );
}

export default Board;
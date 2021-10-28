import React from "react";
import {Grid} from "../../features/Grid/Grid";
import Box, {BoxType} from "../Box/Box";
import {Point} from "../../features/Point";

export interface IBoardProps {
    grid: Grid;
}

const Board: React.FC<IBoardProps> = (props) => {
    return (
        <div className="flex flex-col">
            {
                Array(props.grid.rows).fill(null)
                    .map((x, row) => (
                            <div key={`r_${row}`} className="flex flex-row">
                                {
                                    Array(props.grid.cols).fill(null)
                                        .map((z, col) => {
                                                const id = `e_${row}_${col}`;

                                                let type;
                                                if (props.grid.hasObstacleOnPoint(new Point(row, col))) {
                                                    type = BoxType.Obstacle
                                                } else {
                                                    type = BoxType.NotVisited;
                                                }

                                                return (
                                                    <Box
                                                        type={type}
                                                        key={id}
                                                        data-testid={id}
                                                    />
                                                );
                                            }
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
import React, {useEffect, useRef, useState} from "react";
import {Grid} from "../../features/Grid/Grid";
import Box, {BoxType} from "../Box/Box";
import {Point} from "../../features/Point";
import MarsRover, {CommandType} from "../../features/MarsRover/MarsRover";

export interface IBoardProps {
    grid: Grid;
}

export enum ControlType {
    Move = "k",
    RotateLeft = "j",
    RotateRight = "l",
}

const Board: React.FC<IBoardProps> = (props) => {
    const rover = useRef(new MarsRover(props.grid));
    const [visitedPoints, setVisitedPoints] = useState<Point[]>([]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            switch (event.key as ControlType) {
                case ControlType.Move:
                    rover.current.execute([CommandType.Move]);
                    setVisitedPoints([...visitedPoints, rover.current.coordinates.position]);
                    break;
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    useEffect(() => {
        if (!rover.current.coordinates.position.equals(visitedPoints[visitedPoints.length - 1])) {
            setVisitedPoints([...visitedPoints, rover.current.coordinates.position]);
        }
    }, [visitedPoints]);

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
                                                } else if (rover.current.coordinates.position.equals(new Point(row, col))) {
                                                    type = BoxType.Rover
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
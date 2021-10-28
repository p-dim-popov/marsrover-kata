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
    const [visitedPoints, setVisitedPoints] = useState<Point[]>([rover.current.coordinates.position]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            switch (event.key as ControlType) {
                case ControlType.Move:
                    rover.current.execute([CommandType.Move]);
                    setVisitedPoints([...visitedPoints, rover.current.coordinates.position]);
                    break;
                case ControlType.RotateLeft:
                    rover.current.execute([CommandType.RotateLeft]);
                    break;
                case ControlType.RotateRight:
                    rover.current.execute([CommandType.RotateRight]);
                    break;
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [visitedPoints])

    const rows = Array(props.grid.cols).fill(null)
        .map((_, row) => {
                const cols = Array(props.grid.rows).fill(null)
                    .map((_, col) => {
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
                    );

                return (
                    <div key={row} className="flex flex-col-reverse">
                        {cols}
                    </div>
                );
            }
        );

    return (
        <div className="flex">
            {rows}
        </div>
    );
}

export default Board;
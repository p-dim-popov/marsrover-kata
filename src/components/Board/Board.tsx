import React, {useCallback, useEffect, useRef, useState} from "react";
import {Grid} from "../../features/Grid/Grid";
import Box, {BoxType} from "../Box/Box";
import {IPoint, Point} from "../../features/Point/Point";
import MarsRover, {CommandType} from "../../features/MarsRover/MarsRover";
import {DirectionType} from "../../features/Coordinates/Coordinates";
import {useForceUpdate} from "../../features/utils";
import ControlButton from "../ControlButton/ControlButton";

export interface IBoardProps {
    grid: Grid;
}

export const Controls = {
    Move: ["k", "ArrowUp"],
    RotateLeft: ["j", "ArrowLeft"],
    RotateRight: ["l", "ArrowRight"],
}

export const DirectionToRotateMap: Record<DirectionType, string> = {
    [DirectionType.East]: "",
    [DirectionType.North]: "-rotate-90",
    [DirectionType.West]: "rotate-180",
    [DirectionType.South]: "rotate-90",
};

const Board: React.FC<IBoardProps> = (props) => {
    const rover = useRef(new MarsRover(props.grid));
    const [visitedPoints, setVisitedPoints] = useState<IPoint[]>([{ ...rover.current.coordinates.position }]);
    const forceUpdate = useForceUpdate();

    const moveForward = useCallback(() => {
        rover.current.execute([CommandType.Move]);
        setVisitedPoints([...visitedPoints, { ...rover.current.coordinates.position }]);
    }, [visitedPoints]);

    const rotate = useCallback((direction: CommandType.RotateLeft | CommandType.RotateRight) => {
        rover.current.execute([direction]);
        forceUpdate();
    }, [forceUpdate])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (Controls.Move.includes(event.key)) {
                moveForward();
                return;
            }

            if (Controls.RotateLeft.includes(event.key)) {
                rotate(CommandType.RotateLeft);
                return;
            }

            if (Controls.RotateRight.includes(event.key)) {
                rotate(CommandType.RotateRight);
                return;
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [moveForward, rotate]);

    const getType = useCallback((currentPoint: IPoint): BoxType => {
        if (props.grid.hasObstacleOnPoint(currentPoint)) {
            return BoxType.Obstacle;
        }

        if (Point.equals(rover.current.coordinates.position)(currentPoint)) {
            return BoxType.Rover;
        }

        if (visitedPoints.some(Point.equals(currentPoint))) {
            return BoxType.Visited;
        }

        return BoxType.NotVisited;
    }, [props.grid, visitedPoints]);

    const rows = Array(props.grid.cols).fill(null)
        .map((_, row) => {
                const cols = Array(props.grid.rows).fill(null)
                    .map((_, col) => {
                            const id = `e_${row}_${col}`;
                            const type = getType({ x: row, y: col });

                            return (
                                <div
                                    key={id}
                                    className={type === BoxType.Rover ? `transform ${DirectionToRotateMap[rover.current.coordinates.direction]}` : ""}
                                >
                                    <Box
                                        type={type}
                                        data-testid={id}
                                    />
                                </div>
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
        <div className="flex flex-col items-center space-x-5 space-y-5">
            {rover.current.coordinates.hasObstacles && <span>BLOCKED BY OBSTACLE!</span>}
            <div className="flex">
                {rows}
            </div>
            <div className="flex flex-row justify-between content-center">
                <ControlButton onClick={() => rotate(CommandType.RotateLeft)}>Rotate Left</ControlButton>
                <ControlButton onClick={moveForward}>Move Forward</ControlButton>
                <ControlButton onClick={() => rotate(CommandType.RotateRight)}>Rotate Right</ControlButton>
            </div>
        </div>
    );
}

export default Board;
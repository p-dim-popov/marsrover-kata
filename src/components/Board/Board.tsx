import React, {useCallback, useEffect, useRef, useState} from "react";
import {Grid} from "../../features/Grid/Grid";
import Box, {BoxType} from "../Box/Box";
import {Point} from "../../features/Point";
import MarsRover, {CommandType} from "../../features/MarsRover/MarsRover";
import {DirectionType} from "../../features/Coordinates/Coordinates";
import {useForceUpdate} from "../../features/utils";
import ControlButton from "../ControlButton/ControlButton";

export interface IBoardProps {
    grid: Grid;
}

export enum ControlType {
    Move = "k",
    RotateLeft = "j",
    RotateRight = "l",
}

export const DirectionToRotateMap: Record<DirectionType, string> = {
    [DirectionType.East]: "",
    [DirectionType.North]: "-rotate-90",
    [DirectionType.West]: "rotate-180",
    [DirectionType.South]: "rotate-90",
};

const Board: React.FC<IBoardProps> = (props) => {
    const rover = useRef(new MarsRover(props.grid));
    const [visitedPoints, setVisitedPoints] = useState<Point[]>([new Point(rover.current.coordinates.position.x, rover.current.coordinates.position.y)]);
    const forceUpdate = useForceUpdate();

    const moveForward = useCallback(() => {
        rover.current.execute([CommandType.Move]);
        setVisitedPoints([...visitedPoints, new Point(rover.current.coordinates.position.x, rover.current.coordinates.position.y)]);
    }, [visitedPoints]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            switch (event.key as ControlType) {
                case ControlType.Move:
                    moveForward();
                    break;
                case ControlType.RotateLeft:
                    rover.current.execute([CommandType.RotateLeft]);
                    forceUpdate();
                    break;
                case ControlType.RotateRight:
                    rover.current.execute([CommandType.RotateRight]);
                    forceUpdate();
                    break;
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [forceUpdate, visitedPoints]);

    const getType = (currentPoint: Point) => {
        if (props.grid.hasObstacleOnPoint(currentPoint)) {
            return BoxType.Obstacle;
        }

        if (rover.current.coordinates.position.equals(currentPoint)) {
            return BoxType.Rover;
        }

        if (visitedPoints.some(point => point.equals(currentPoint))) {
            return BoxType.Visited;
        }

        return BoxType.NotVisited;
    }

    const rows = Array(props.grid.cols).fill(null)
        .map((_, row) => {
                const cols = Array(props.grid.rows).fill(null)
                    .map((_, col) => {
                            const id = `e_${row}_${col}`;
                            const currentPoint = new Point(row, col);
                            const type = getType(currentPoint);

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
        <div className="flex flex-col">
            {rover.current.coordinates.hasObstacles && <span>BLOCKED BY OBSTACLE!</span>}
            <div className="flex">
                {rows}
            </div>
            <div className="flex flex-row justify-between content-center">
                <ControlButton>Rotate Left</ControlButton>
                <ControlButton onClick={moveForward}>Move Forward</ControlButton>
                <ControlButton>Rotate Right</ControlButton>
            </div>
        </div>
    );
}

export default Board;
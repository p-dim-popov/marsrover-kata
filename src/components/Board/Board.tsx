import React, {useCallback, useEffect, useState} from "react";
import {Grid, IGrid} from "../../features/Grid/Grid";
import Box, {BoxType} from "../Box/Box";
import {IPoint, Point} from "../../features/Point/Point";
import {CommandType, MarsRover} from "../../features/MarsRover/MarsRover";
import {Coordinates, DirectionType} from "../../features/Coordinates/Coordinates";
import ControlButton from "../ControlButton/ControlButton";

export interface IBoardProps {
    grid: IGrid;
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

export const getPointFromIndex = (i: number, grid: IGrid): IPoint => {
    const x = (i % grid.cols);
    const y = Math.floor(i / grid.cols);
    return { x, y };
}

const Board: React.FC<IBoardProps> = (props) => {
    const [rover, setRover] = useState(MarsRover.new());
    const [visitedPoints, setVisitedPoints] = useState<IPoint[]>([{...rover.coordinates.position}]);

    const controlRover = useCallback((command: CommandType) => {
        const [coordinates, execError] = MarsRover.execute([command])(props.grid)(rover);
        if (execError || !coordinates) {
            return;
        }

        const [parsedCoordinates, parseError] = Coordinates.parse(coordinates);
        if (parseError || !parsedCoordinates) {
            return;
        }

        setRover(MarsRover.new(parsedCoordinates));
        setVisitedPoints([...visitedPoints, {...parsedCoordinates.position}]);

    }, [props.grid, rover, visitedPoints]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (Controls.Move.includes(event.key)) {
                controlRover(CommandType.Move);
                return;
            }

            if (Controls.RotateLeft.includes(event.key)) {
                controlRover(CommandType.RotateLeft);
                return;
            }

            if (Controls.RotateRight.includes(event.key)) {
                controlRover(CommandType.RotateRight);
                return;
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [controlRover]);

    const getType = useCallback((currentPoint: IPoint): BoxType => {
        if (Grid.hasObstacleOnPoint(currentPoint)(props.grid)) {
            return BoxType.Obstacle;
        }

        if (Point.equals(rover.coordinates.position)(currentPoint)) {
            return BoxType.Rover;
        }

        if (visitedPoints.some(Point.equals(currentPoint))) {
            return BoxType.Visited;
        }

        return BoxType.NotVisited;
    }, [props.grid, rover.coordinates.position, visitedPoints]);

    const boxes: JSX.Element[] = [];
    for (let i = 0; i < props.grid.rows * props.grid.cols; i++) {
        const currentPoint = getPointFromIndex(i, props.grid);
        const id = `e_${currentPoint.x}_${currentPoint.y}`;
        const type = getType(currentPoint);

        boxes.push(
            <div
                key={id}
                className={`${type === BoxType.Rover ? `transform ${DirectionToRotateMap[rover.coordinates.direction]}` : ""}`}
                style={{ gridRow: props.grid.rows - currentPoint.y }}
            >
                <Box
                    type={type}
                    data-testid={id}
                />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center space-x-5 space-y-5">
            <div className="h-10">
                {rover.coordinates.hasObstacles && <span>BLOCKED BY OBSTACLE!</span>}
            </div>
            <div className={`grid grid-cols-${props.grid.cols}`}>
                {boxes}
            </div>
            <div className="flex flex-row justify-between content-center">
                <ControlButton onClick={() => controlRover(CommandType.RotateLeft)}>Rotate Left</ControlButton>
                <ControlButton onClick={() => controlRover(CommandType.Move)}>Move Forward</ControlButton>
                <ControlButton onClick={() => controlRover(CommandType.RotateRight)}>Rotate Right</ControlButton>
            </div>
        </div>
    );
}

export default Board;

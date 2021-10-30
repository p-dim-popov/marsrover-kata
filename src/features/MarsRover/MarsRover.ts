import {Grid, IGrid} from "../Grid/Grid";
import {Coordinates, DIRECTIONS_ORDER, DirectionType, ICoordinates} from "../Coordinates/Coordinates";
import {IPoint} from "../Point/Point";

export enum CommandType {
    Move = "M",
    RotateLeft = "L",
    RotateRight = "R",
}

export interface IMarsRover {
    coordinates: ICoordinates;
}

const _MarsRover = {
    tryMoveTowardsPoint: (point: Partial<IPoint>) => (grid: IGrid) => (coordinates: ICoordinates): ICoordinates => {
        const desiredPoint = {...coordinates.position, ...point};
        if (Grid.hasObstacleOnPoint(desiredPoint)(grid)) {
            return {
                ...coordinates,
                hasObstacles: true,
            };
        }

        return {
            ...coordinates,
            position: desiredPoint,
            hasObstacles: false,
        }
    },

    getMoveFunction: (grid: IGrid) => (coordinates: ICoordinates): [((grid: IGrid) => (coordinates: ICoordinates) => ICoordinates)?, Error?] => {
        switch (coordinates.direction) {
            case DirectionType.East: {
                const desiredX = (coordinates.position.x + 1) % grid.cols;
                return [_MarsRover.tryMoveTowardsPoint({x: desiredX})];
            }
            case DirectionType.West: {
                const desiredX = (!coordinates.position.x ? grid.cols : coordinates.position.x) - 1;
                return [_MarsRover.tryMoveTowardsPoint({x: desiredX})];
            }
            case DirectionType.North: {
                const desiredY = (coordinates.position.y + 1) % grid.rows;
                return [_MarsRover.tryMoveTowardsPoint({y: desiredY})];
            }
            case DirectionType.South: {
                const desiredY = (!coordinates.position.y ? grid.rows : coordinates.position.y) - 1;
                return [_MarsRover.tryMoveTowardsPoint({y: desiredY})];
            }
            default:
                return [undefined, Error("Unknown direction!")];
        }
    },

    moveForward: (grid: IGrid) => (coordinates: ICoordinates): [ICoordinates?, Error?] => {
        const [fn, err] = _MarsRover.getMoveFunction(grid)(coordinates);
        if (err || !fn) {
            return [undefined, err];
        }

        return [fn(grid)(coordinates)];
    },
}

export const MarsRover = {
    new(coordinates: ICoordinates = Coordinates.parse("0:0:N")[0]!): IMarsRover {
        return {
            coordinates,
        };
    },

    execute: (commands: string | CommandType[]) => (grid: IGrid) => (self: IMarsRover): [string?, Error?] => {
        if (!commands) {
            return [undefined, Error("Command/s is not valid!")];
        }

        const _commands = (typeof commands === "string" ? commands.split("") : commands);
        const [coordinates,] = _commands
            .reduce<[ICoordinates, Error?]>(([prevCoordinates, error], command) => {
                switch (command as CommandType) {
                    case CommandType.Move:
                        const [currentCoordinates, err] = _MarsRover.moveForward(grid)(prevCoordinates);
                        if (err || !currentCoordinates) {
                            return [prevCoordinates, err];
                        }

                        return [currentCoordinates];
                    case CommandType.RotateRight:
                        return [Coordinates.new(
                            prevCoordinates.position,
                            DIRECTIONS_ORDER[(DIRECTIONS_ORDER.indexOf(prevCoordinates.direction) + 1) % DIRECTIONS_ORDER.length],
                            false,
                        )];
                    case CommandType.RotateLeft:
                        const index = DIRECTIONS_ORDER.indexOf(prevCoordinates.direction);
                        return [Coordinates.new(
                            prevCoordinates.position,
                            DIRECTIONS_ORDER[(!index ? DIRECTIONS_ORDER.length : index) - 1],
                            false,
                        )];
                    default:
                        return [prevCoordinates, Error("Command type not known!")];
                }
            }, [{...self.coordinates}]);

        return [Coordinates.toString(coordinates)];
    },
}

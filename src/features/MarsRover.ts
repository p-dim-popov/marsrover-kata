import {Grid} from "./Grid";
import {Coordinates, DIRECTIONS_ORDER, DirectionType} from "./Coordinates";
import {Point} from "./Point";

export enum CommandType {
    Move = "M",
    RotateLeft = "L",
    RotateRight = "R",
}

export interface IMarsRover {
    execute(command: string | CommandType[]): string;
}

export interface IMarsRoverConstructor {
    new(grid: Grid): IMarsRover;
}

export const MarsRover: IMarsRoverConstructor = class implements IMarsRover {
    private coordinates = new Coordinates("0:0:N");

    constructor(private readonly grid: Grid) {}

    execute(commands: string | CommandType[]): string {
        if (!commands) {
            throw new Error("Command/s is not valid!");
        }

        for (const _ of typeof commands === "string" ? commands.split(""): commands) {
            const command = _ as CommandType;
            switch (command) {
                case CommandType.Move:
                    switch (this.coordinates.direction) {
                        case DirectionType.East: {
                            const desiredX = (this.coordinates.position.x + 1) % this.grid.cols;
                            if (this.grid.hasObstacleOnPoint(new Point(desiredX, this.coordinates.position.y))) {
                                this.coordinates.hasObstacles = true;
                            } else {
                                this.coordinates.position.x = desiredX;
                            }
                            break;
                        }
                        case DirectionType.West: {
                            const desiredX = (!this.coordinates.position.x ? this.grid.cols : this.coordinates.position.x) - 1;
                            if (this.grid.hasObstacleOnPoint(new Point(desiredX, this.coordinates.position.y))) {
                                this.coordinates.hasObstacles = true;
                            } else {
                                this.coordinates.position.x = desiredX;
                            }
                            break;
                        }
                        case DirectionType.North: {
                            const desiredY = (this.coordinates.position.y + 1) % this.grid.rows;
                            if (this.grid.hasObstacleOnPoint(new Point(this.coordinates.position.x, desiredY))) {
                                this.coordinates.hasObstacles = true;
                            } else {
                                this.coordinates.position.y = desiredY;
                            }
                            break;
                        }
                        case DirectionType.South: {
                            const desiredY = (!this.coordinates.position.y ? this.grid.rows : this.coordinates.position.y) - 1;
                            if (this.grid.hasObstacleOnPoint(new Point(this.coordinates.position.x, desiredY))) {
                                this.coordinates.hasObstacles = true;
                            } else {
                                this.coordinates.position.y = desiredY;
                            }
                            break;
                        }
                        default:
                            throw new Error("Unknown direction!")
                    }
                    break;
                case CommandType.RotateRight:
                    this.coordinates.direction = DIRECTIONS_ORDER[(DIRECTIONS_ORDER.indexOf(this.coordinates.direction) + 1) % DIRECTIONS_ORDER.length];
                    break;
                case CommandType.RotateLeft:
                    this.coordinates.direction = DIRECTIONS_ORDER[Math.abs(DIRECTIONS_ORDER.indexOf(this.coordinates.direction) - 1) % DIRECTIONS_ORDER.length];
                    break;
                default:
                    throw new Error("Command type not known!");
            }
        }

        return this.coordinates.toString();
    }
}

export default MarsRover;

import {Grid} from "./Grid";
import {Coordinates, DIRECTIONS_ORDER, DirectionType} from "./Coordinates";

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
                            const desired = (this.coordinates.position.x + 1) % this.grid.cols;
                            if (this.grid.obstacles.every(point => point.x !== desired || point.y !== this.coordinates.position.y)) {
                                this.coordinates.position.x = desired;
                            } else {
                                this.coordinates.hasObstacles = true;
                            }
                            break;
                        }
                        case DirectionType.West: {
                            const desired = (!this.coordinates.position.x ? this.grid.cols : this.coordinates.position.x) - 1;
                            if (this.grid.obstacles.every(point => point.x !== desired || point.y !== this.coordinates.position.y)) {
                                this.coordinates.position.x = desired;
                            } else {
                                this.coordinates.hasObstacles = true;
                            }
                            break;
                        }
                        case DirectionType.North: {
                            const desired = (this.coordinates.position.y + 1) % this.grid.rows;
                            if (this.grid.obstacles.every(point => point.y !== desired || point.x !== this.coordinates.position.x)) {
                                this.coordinates.position.y = desired;
                            } else {
                                this.coordinates.hasObstacles = true;
                            }
                            break;
                        }
                        case DirectionType.South: {
                            const desired = (!this.coordinates.position.y ? this.grid.rows : this.coordinates.position.y) - 1;
                            if (this.grid.obstacles.every(point => point.y !== desired || point.x !== this.coordinates.position.x)) {
                                this.coordinates.position.y = desired;
                            } else {
                                this.coordinates.hasObstacles = true;
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

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
                        case DirectionType.East:
                            this.coordinates.position.x = (this.coordinates.position.x + 1) % this.grid.cols;
                            break;
                        case DirectionType.West:
                            this.coordinates.position.x = (!this.coordinates.position.x ? this.grid.cols : this.coordinates.position.x) - 1;
                            break;
                        case DirectionType.North:
                            this.coordinates.position.y = (this.coordinates.position.y + 1) % this.grid.rows;
                            break;
                        case DirectionType.South:
                            this.coordinates.position.y = (!this.coordinates.position.y ? this.grid.rows : this.coordinates.position.y) - 1;
                            break;
                        default:
                            throw new Error("Unknown direction!")
                    }
                    break;
                case CommandType.RotateRight:
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

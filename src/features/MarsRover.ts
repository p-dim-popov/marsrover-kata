import {Grid} from "./Grid";
import {Coordinates, DirectionType} from "./Coordinates";

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
                        case DirectionType.West:
                            this.coordinates.col = (this.coordinates.col + 1) % this.grid.cols;
                            break;
                        case DirectionType.North:
                        case DirectionType.South:
                            this.coordinates.row = (this.coordinates.row + 1) % this.grid.rows;
                            break;
                        default:
                            throw new Error("Unknown direction!")
                    }
                    break;
                case CommandType.RotateRight:
                    break;
                case CommandType.RotateLeft:
                    break;
                default:
                    throw new Error("Command type not known!");
            }
        }

        return this.coordinates.toString();
    }
}

export default MarsRover;

import {Grid} from "./Grid";
import {Coordinates, DirectionType} from "./Coordinates";

export interface IMarsRover {
    move(command: string): string;
}

export interface IMarsRoverConstructor {
    new(grid: Grid): IMarsRover;
}

export enum CommandType {
    Move = "M",
    RotateLeft = "L",
    RotateRight = "R",
}

export const MarsRover: IMarsRoverConstructor = class implements IMarsRover {
    private coordinates = new Coordinates("0:0:N");
    constructor(private readonly grid: Grid) {}
    move(commands: string | CommandType[]): string {
        if (!commands) {
            throw new Error("Command is not valid!");
        }

        for (const _ of typeof commands === "string" ? commands.split(""): commands) {
            const command = _ as CommandType;
            switch (command) {
                case CommandType.Move:
                    switch (this.coordinates.direction) {
                        case DirectionType.East:
                        case DirectionType.West:
                            this.coordinates.col += 1;
                            break;
                        case DirectionType.North:
                        case DirectionType.South:
                            this.coordinates.row += 1;
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

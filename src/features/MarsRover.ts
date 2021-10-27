import {Grid} from "./Grid";
import {Coordinates} from "./Coordinates";

export interface IMarsRover {
    move(command: string): string;
}

export interface IMarsRoverConstructor {
    new(grid: Grid): IMarsRover;
}

export const MarsRover: IMarsRoverConstructor = class implements IMarsRover {
    private coordinates = new Coordinates("0:0:N");
    constructor(private readonly grid: Grid) {}
    move(command: string): string {
        return this.coordinates.toString();
    }
}

export default MarsRover;

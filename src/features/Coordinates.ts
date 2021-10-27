import {isNullNanUndefinedOrEmptyString} from "./utils";

export enum DirectionType {
    East = "E",
    West = "W",
    North = "N",
    South = "S",
}

export interface ICoordinates {
    row: number;
    col: number;
    direction: DirectionType;
    hasObstacles: boolean;
    toString(): string;
}

export interface ICoordinatesConstructor {
    new(coords: string): ICoordinates;
    new(row: number, col: number, direction: string, hasObstacles?: boolean): ICoordinates;

    parse(coords: string): ICoordinates;
}

export const Coordinates: ICoordinatesConstructor = class Coordinates implements ICoordinates {
    row = 0;
    col = 0;
    direction: DirectionType = DirectionType.North;
    hasObstacles = false;

    constructor(row: string | number, col: number, direction: DirectionType, hasObstacles: boolean = false) {
        if (typeof row === "string") {
            // TODO: implement clone
            const data = Coordinates.parse(row);
            this.row = data.row;
            this.col = data.col;
            this.direction = data.direction;
            this.hasObstacles = data.hasObstacles;
        } else if (typeof row === "number") {
            this.row = row;
            this.col = col;
            this.direction = direction;
            this.hasObstacles = hasObstacles;
        } else {
            throw new Error("Not valid coordinates!")
        }
    }

    static parse(coords: string): Coordinates {
        if (!coords) {
            throw new Error("Not valid coordinates!")
        }

        let hasObstacles = false;
        if (coords.startsWith("O:")) {
            hasObstacles = true;
            coords = coords.replace("O:", "");
        }

        const splittedCoords = coords.split(":");

        const row = +splittedCoords[0];
        const col = +splittedCoords[1];
        const direction = splittedCoords[2] as DirectionType;

        if (isNullNanUndefinedOrEmptyString(row)
            || isNullNanUndefinedOrEmptyString(col)
            || isNullNanUndefinedOrEmptyString(direction) || !Object.values(DirectionType).includes(direction)) {
            throw new Error("Not valid coordinates!")
        }

        return new Coordinates(row, col, direction, hasObstacles);
    }

    toString(): string {
        let result = `${this.row}:${this.col}:${this.direction}`

        if (this.hasObstacles) {
            result = "O:" + result;
        }

        return result;
    }
}

export default Coordinates;
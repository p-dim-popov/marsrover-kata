import {isNullNanUndefinedOrEmptyString} from "../utils";
import {IPoint} from "../Point/Point";

export enum DirectionType {
    East = "E",
    West = "W",
    North = "N",
    South = "S",
}

export const DIRECTIONS_ORDER = [DirectionType.East, DirectionType.South, DirectionType.West, DirectionType.North];

export interface ICoordinates {
    position: IPoint;
    direction: DirectionType;
    hasObstacles: boolean;
    toString(): string;
}

export interface ICoordinatesConstructor {
    new(coords: string): ICoordinates;
    new(position: IPoint, direction: string, hasObstacles?: boolean): ICoordinates;

    parse(coords: string): ICoordinates;
}

// TODO: Fix typings
// @ts-ignore
export const Coordinates: ICoordinatesConstructor = class Coordinates implements ICoordinates {
    readonly position: IPoint;
    direction: DirectionType = DirectionType.North;
    hasObstacles = false;

    constructor(position: string | IPoint, direction: DirectionType, hasObstacles: boolean = false) {
        if (typeof position === "string") {
            const data = Coordinates.parse(position);
            this.position = { ...data.position };
            this.direction = data.direction;
            this.hasObstacles = data.hasObstacles;
        } else {
            this.position = { ...position };
            this.direction = direction;
            this.hasObstacles = hasObstacles;
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

        return new Coordinates({ x: row, y: col }, direction, hasObstacles);
    }

    toString(): string {
        let result = `${this.position.x}:${this.position.y}:${this.direction}`

        if (this.hasObstacles) {
            result = "O:" + result;
        }

        return result;
    }
}

export default Coordinates;
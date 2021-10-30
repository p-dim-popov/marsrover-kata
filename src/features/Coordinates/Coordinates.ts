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
}

export const Coordinates = {
    new: (position: IPoint, direction: DirectionType = DirectionType.North, hasObstacles: boolean = false): ICoordinates => {
        return {
            position: { ...position },
            direction,
            hasObstacles,
        }
    },

    parse: (coords: string): [ICoordinates?, Error?] => {
        if (!coords) {
            return [undefined, Error("Coordinates are required!")];
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

        if (Number.isNaN(row)) {
            return [undefined, Error("Rows are required!")];
        }

        if (Number.isNaN(col)) {
            return [undefined, Error("Columns are required")];
        }

        if (!direction || !Object.values(DirectionType).includes(direction)) {
            return [undefined, Error(`Direction is not one of the possible: ${DirectionType}`)];
        }

        return [{ position: { x: row, y: col }, direction, hasObstacles }];
    },

    toString: (self: ICoordinates): string => {
        let result = `${self.position.x}:${self.position.y}:${self.direction}`

        if (self.hasObstacles) {
            result = "O:" + result;
        }

        return result;
    },
};

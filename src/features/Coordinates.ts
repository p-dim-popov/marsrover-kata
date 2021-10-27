import {isNullNanUndefinedOrEmptyString} from "./utils";

export class Coordinates {
    row = 0;
    col = 0;
    direction: string;
    hasObstacles = false;

    constructor(coords: string) {
        if (!coords) {
            throw new Error("Not valid coordinates!")
        }

        if (coords.startsWith("O:")) {
            this.hasObstacles = true;
            coords = coords.replace("O:", "");
        }

        const [row, col, direction] = coords.split(":");

        this.row = +row;
        this.col = +col;
        this.direction = direction;

        if (isNullNanUndefinedOrEmptyString(this.row)
            || isNullNanUndefinedOrEmptyString(this.col)
            || isNullNanUndefinedOrEmptyString(this.direction)) {
            throw new Error("Not valid coordinates!")
        }
    }

    static parse(coords: string): Coordinates {
        return new Coordinates(coords);
    }

    toString(): string {
        let result = `${this.row}:${this.col}:${this.direction}`

        if (this.hasObstacles) {
            result = "O:" + result;
        }

        return result;
    }
}
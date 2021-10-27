export const isNullNanUndefinedOrEmptyString = (value: any): boolean => {
    return value === null || value === void 0 || Number.isNaN(value) || value === "";
}

export class Grid {
    constructor(private readonly rows: number, private readonly cols?: number) {
        if (!cols) {
            this.cols = rows;
        }
    }
}

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

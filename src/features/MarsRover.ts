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

        if (!row || !col || !direction) {
            throw new Error("Not valid coordinates!")
        }

        this.row = +row;
        this.col = +col;
        this.direction = direction;
    }

    static parse(coords: string): Coordinates {
        return new Coordinates(coords);
    }
}

export interface IMarsRover {
    move(command: string): string;
}

export interface IMarsRoverConstructor {
    new(grid: Grid): IMarsRover;
}

export const MarsRover: IMarsRoverConstructor = class implements IMarsRover {
    constructor(private readonly grid: Grid) {}
    move(command: string): string {
        return "";
    }
}

export default MarsRover;

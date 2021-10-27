export class Grid {
    constructor(private readonly rows: number, private readonly cols?: number) {
        if (!cols) {
            this.cols = rows;
        }
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

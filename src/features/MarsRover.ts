export class Grid {
    constructor(private readonly rows: number, private readonly cols?: number) {
        if (!cols) {
            this.cols = rows;
        }
    }
}

export interface IMarsRover {
    new(grid: Grid): this;
    move(command: string): string;
}

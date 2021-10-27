export class Grid {
    public readonly rows: number;
    public readonly cols: number;

    constructor(rows: number, cols?: number) {
        this.rows = rows;
        this.cols = cols ?? rows;
    }
}

import {Point} from "./Point";

export class Grid {
    public readonly rows: number;
    public readonly cols: number;
    public readonly obstacles: Point[];

    constructor(rows: number, cols?: number | Point[], obstacles?: Point[]) {
        this.rows = rows;
        this.cols = rows;
        this.obstacles = obstacles ?? [];

        if (typeof cols === "number") {
            this.cols = cols;
        } else if (Array.isArray(cols)) {
            this.obstacles = cols;
        }
    }
}

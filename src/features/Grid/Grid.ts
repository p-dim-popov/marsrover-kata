import {IPoint, Point} from "../Point/Point";

export class Grid {
    public readonly rows: number;
    public readonly cols: number;
    public readonly obstacles: IPoint[];

    constructor(rows: number, cols?: number | IPoint[], obstacles?: IPoint[]) {
        this.rows = rows;
        this.cols = rows;
        this.obstacles = obstacles ?? [];

        if (typeof cols === "number") {
            this.cols = cols;
        } else if (Array.isArray(cols)) {
            this.obstacles = cols;
        }
    }

    hasObstacleOnPoint = (desiredPoint: IPoint) => this.obstacles
        .some(Point.equals(desiredPoint));
}

import {IPoint, Point} from "../Point/Point";

export interface IGrid {
    readonly rows: number;
    readonly cols: number;
    readonly obstacles?: IPoint[];
}

export const Grid = {
    new: ([rows, cols = rows]: [rows: number, cols?: number], obstacles?: IPoint[]): IGrid => {
        return {
            rows,
            cols: cols ?? rows,
            obstacles: obstacles ?? [],
        };
    },

    hasObstacleOnPoint: (desiredPoint: IPoint) => (self: IGrid) => self.obstacles
        ?.some?.(Point.equals(desiredPoint)),
}

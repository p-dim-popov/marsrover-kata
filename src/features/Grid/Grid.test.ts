import {Grid} from "./Grid";
import {Point} from "../Point/Point";

const grid = new Grid(10, [new Point(2, 3)])

describe("Grid", () => {
    describe("hasObstacleOnPoint", () => {
        it.each([
            [new Point(1, 3), false],
            [new Point(2, 3), true],
            [new Point(2, 0), false],
        ])("should return true if point is an obstacle %s -> %s", function (point: Point, isObstacle: boolean) {
            expect(grid.hasObstacleOnPoint(point)).toEqual(isObstacle);
        });
    })
})
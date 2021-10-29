import {Grid} from "./Grid";
import {IPoint} from "../Point/Point";

const grid = Grid.new([10], [{ x: 2, y: 3 }])

describe("Grid", () => {
    describe("hasObstacleOnPoint", () => {
        it.each([
            [{ x: 1, y: 3}, false],
            [{ x: 2, y: 3}, true],
            [{ x: 2, y: 0}, false],
        ])("should return true if point is an obstacle %s -> %s", function (point: IPoint, isObstacle: boolean) {
            expect(Grid.hasObstacleOnPoint(point)(grid)).toEqual(isObstacle);
        });
    })
})
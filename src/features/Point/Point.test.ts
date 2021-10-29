import {IPoint, Point} from "./Point";

describe("Point", () => {
    it.each([
        [{ x: 1, y: 2 }, { x: 1, y: 2 }, true],
        [{ x: 1, y: 2 }, { x: 1, y: 0 }, false],
        [null!, { x: 1, y: 2 }, false],
        [{ x: 1, y: 2 }, null!, false],
        [null!, null!, true],
    ])("should compare correctly - (%s), (%s)", function (point1: IPoint, point2: IPoint, areEqual: boolean) {
        expect(Point.equals(point1)(point2)).toEqual(areEqual);
    });
});

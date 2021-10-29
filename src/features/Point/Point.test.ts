import {Point} from "./Point";

describe("Point", () => {
    it("should have clone method", function () {
        const point1 = new Point(1, 2);
        const point1Clone = point1.clone();
        expect(point1.x).toEqual(point1Clone.x);
        expect(point1.y).toEqual(point1Clone.y);
    });

    it("should have clone function", function () {
        const point1 = new Point(1, 2);
        const point1Clone = Point.clone(point1);
        expect(point1.x).toEqual(point1Clone.x);
        expect(point1.y).toEqual(point1Clone.y);
    });
});

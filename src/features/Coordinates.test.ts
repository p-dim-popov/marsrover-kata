import {Coordinates} from "./Coordinates";
import {stringifyCoordinates} from "./utils";

describe("Coordinates", () => {
    describe("parse", () => {
        it.each([
            [0, 0, "N", false],
            [1, 2, "N", false],
            [1, 2, "N", true],
        ])("should parse (%s:%s:%s), with obstacles - %s", function (row: number, col: number, direction: string, hasObstacles: boolean) {
            const stringCoordinates = stringifyCoordinates(row, col, direction, hasObstacles);
            const coordinates = Coordinates.parse(stringCoordinates);
            expect(coordinates.hasObstacles).toEqual(hasObstacles);
            expect(coordinates.position.x).toEqual(row);
            expect(coordinates.position.y).toEqual(col);
        });

        it.each([
            [void 0, 2, "N", false],
            [1, 2, "", true],
            [1, 2, "", "Z:"],
        ])('should throw (%s:%s:%s), with obstacles - %s', function (row?: number, col?: number, direction?: string, hasObstacles?: boolean | string) {
            const stringCoordinates = stringifyCoordinates(row, col, direction, hasObstacles);
            expect(() => Coordinates.parse(stringCoordinates)).toThrow();
        });
    })
})

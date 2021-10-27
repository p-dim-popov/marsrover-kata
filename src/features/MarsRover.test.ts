import MarsRover, {Coordinates, Grid} from "./MarsRover";

export const stringifyCoordinates = (row?: number, col?: number, direction?: string, hasObstacles?: boolean | string) => {
    let result = `${row}:${col}:${direction}`;
    switch (typeof hasObstacles) {
        case "boolean":
            if (hasObstacles) {
                result = "O:" + result;
            }
            break;
        case "string":
            result = hasObstacles + result;
            break;
        default:
            break;
    }

    return result;
}

describe("MarsRover", () => {
    describe("MarsRover", () => {
        describe("move", () => {
            it("should return string", function () {
                const marsRover = new MarsRover(new Grid(10));
                expect(marsRover.move("")).toEqual("");
            });
        })
    })

    describe("Coordinates", () => {
        describe("parse", () => {
            it.each([
                [1, 2, "N", false],
                [1, 2, "N", true],
            ])("should parse (%s:%s:%s), with obstacles - %s", function (row: number, col: number, direction: string, hasObstacles: boolean) {
                const stringCoordinates = stringifyCoordinates(row, col, direction, hasObstacles);
                const coordinates = Coordinates.parse(stringCoordinates);
                expect(coordinates.hasObstacles).toEqual(hasObstacles);
                expect(coordinates.row).toEqual(row);
                expect(coordinates.col).toEqual(col);
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
})
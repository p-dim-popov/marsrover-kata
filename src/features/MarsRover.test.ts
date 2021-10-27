import MarsRover, {Coordinates, Grid} from "./MarsRover";

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
                const stringCoordinates = `${hasObstacles ? "O:" : ""}${row}:${col}:${direction}`;
                const coordinates = Coordinates.parse(stringCoordinates);
                expect(coordinates.hasObstacles).toEqual(hasObstacles);
                expect(coordinates.row).toEqual(row);
                expect(coordinates.col).toEqual(col);
            });
        })
    })
})
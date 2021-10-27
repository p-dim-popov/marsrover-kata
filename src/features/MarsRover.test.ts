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
                ["0:0:N", false],
                ["O:0:0:N", true],
            ])("should parse (%s)", function (coords: string, hasObstacles: boolean) {
                const coordinates = Coordinates.parse(coords);
                expect(coordinates.hasObstacles).toEqual(hasObstacles);
            });
        })
    })
})
import MarsRover from "./MarsRover";
import {Grid} from "./Grid";
import {Coordinates} from "./Coordinates";

const basicGrid = new Grid(10);

describe("MarsRover", () => {
    describe("move", () => {
        it("should throw when command is not valid", function () {
            const marsRover = new MarsRover(basicGrid);
            expect(() => marsRover.move("")).toThrow();
        });

        it("should return valid coordinates", function () {
            const marsRover = new MarsRover(basicGrid);
            expect(() => Coordinates.parse(marsRover.move("MMM"))).not.toThrow();
        });

        it.each([
            ["M", "1:0:N"],
            ["MMM", "3:0:N"],
        ])('should work as expected', function (commands: string, expectedCoordinates) {
            const marsRover = new MarsRover(basicGrid);
            expect(marsRover.move(commands)).toEqual(expectedCoordinates);
        });
    })
})
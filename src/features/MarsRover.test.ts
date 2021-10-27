import MarsRover, {CommandType} from "./MarsRover";
import {Grid} from "./Grid";
import {Coordinates} from "./Coordinates";
import {Point} from "./Point";

const grid = new Grid(10, [ new Point(1, 3) ]);

describe("MarsRover", () => {
    describe("execute", () => {
        it("should throw when command is not valid", function () {
            const marsRover = new MarsRover(grid);
            expect(() => marsRover.execute("")).toThrow();
        });

        it("should return valid coordinates", function () {
            const marsRover = new MarsRover(grid);
            expect(() => Coordinates.parse(marsRover.execute("MMM"))).not.toThrow();
        });

        it.each([
            ["M", "0:1:N"],
            ["MMM", "0:3:N"],
            [[CommandType.Move, CommandType.Move], "0:2:N"],
            ["MMMMMMMMMM", "0:0:N"],
            ["MMLMLMM", "9:0:S"],
            ["MMLRRM", "1:2:E"],
        ])('should move as expected (%s) -> (%s)', function (commands: string | CommandType[], expectedCoordinates) {
            const marsRover = new MarsRover(grid);
            expect(marsRover.execute(commands)).toEqual(expectedCoordinates);
        });
    })
})
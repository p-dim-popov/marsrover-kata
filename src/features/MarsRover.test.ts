import MarsRover, {CommandType} from "./MarsRover";
import {Grid} from "./Grid";
import {Coordinates} from "./Coordinates";

const basicGrid = new Grid(10);

describe("MarsRover", () => {
    describe("execute", () => {
        it("should throw when command is not valid", function () {
            const marsRover = new MarsRover(basicGrid);
            expect(() => marsRover.execute("")).toThrow();
        });

        it("should return valid coordinates", function () {
            const marsRover = new MarsRover(basicGrid);
            expect(() => Coordinates.parse(marsRover.execute("MMM"))).not.toThrow();
        });

        it.each([
            ["M", "1:0:N"],
            ["MMM", "3:0:N"],
            [[CommandType.Move, CommandType.Move], "2:0:N"],
            ["MMMMMMMMMM", "0:0:N"],
        ])('should move as expected (%s) -> (%s)', function (commands: string | CommandType[], expectedCoordinates) {
            const marsRover = new MarsRover(basicGrid);
            expect(marsRover.execute(commands)).toEqual(expectedCoordinates);
        });
    })
})
import {CommandType, MarsRover} from "./MarsRover";
import {Grid} from "../Grid/Grid";
import {Coordinates} from "../Coordinates/Coordinates";

const gridWithObstacle = Grid.new([10], [{ x: 1, y: 3 }]);

describe("MarsRover", () => {
    describe("execute", () => {
        it("should throw when command is not valid", function () {
            const marsRover = MarsRover.new();
            const [coordinates, error] = MarsRover.execute("")(gridWithObstacle)(marsRover);
            expect(coordinates).toBeFalsy();
            expect(error).toBeTruthy();
        });

        it("should return valid coordinates", function () {
            const marsRover = MarsRover.new();
            const [coordinates] = MarsRover.execute("MMM")(gridWithObstacle)(marsRover);
            const [parsedCoordinates, parseError] = Coordinates.parse(coordinates!);
            expect(parsedCoordinates).toBeTruthy();
            expect(parseError).toBeFalsy();
        });

        it.each([
            ["M", "0:1:N"],
            ["MMM", "0:3:N"],
            [[CommandType.Move, CommandType.Move], "0:2:N"],
            ["MMMMMMMMMM", "0:0:N"],
            ["MMLMLMM", "9:0:S"],
            ["MMLRRM", "1:2:E"],
            ["MMMRMMM", "O:0:3:E"],
            ["MMMRMMMLMMMMMMM", "0:0:N"],
        ])('should move as expected (%s) -> (%s)', function (commands: string | CommandType[], expectedCoordinates) {
            const marsRover = MarsRover.new();
            const [coordinates] = MarsRover.execute(commands)(gridWithObstacle)(marsRover);
            expect(coordinates).toEqual(expectedCoordinates);
        });
    });

    it.each([
        ["MMMRMMML"],
        ["MMMRMMMR"],
    ])("should report not blocked when rotate after being blocked - %s", function (commands: string | CommandType[]) {
        const marsRover = MarsRover.new();
        const [coordinates] = Coordinates.parse(MarsRover.execute(commands)(gridWithObstacle)(marsRover)[0]!);
        expect(coordinates!.hasObstacles).toEqual(false);
    });
})

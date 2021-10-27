import MarsRover, {Grid} from "./MarsRover";

describe("MarsRover", () => {
    describe("move", () => {
        it('should return string', function () {
            const marsRover = new MarsRover(new Grid(10));
            expect(marsRover.move("")).toEqual("");
        });
    })
})
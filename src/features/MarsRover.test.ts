import { IMarsRover } from "./MarsRover";

describe("MarsRover", () => {
    let marsRover: IMarsRover;
    beforeEach(() => {
        marsRover = {move: () => ""} as unknown as IMarsRover;
    })

    describe("move", () => {
        it('should return string', function () {
            expect(marsRover.move("")).toEqual("");
        });
    })
})
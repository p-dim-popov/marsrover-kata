import MarsRover from "./MarsRover";
import {Grid} from "./Grid";
import {Coordinates} from "./Coordinates";

describe("MarsRover", () => {
    describe("move", () => {
        it("should return valid coordinates", function () {
            const marsRover = new MarsRover(new Grid(10));
            expect(() => Coordinates.parse(marsRover.move(""))).not.toThrow();
        });
    })
})
import {render} from "@testing-library/react";
import Board from "./Board";
import {Grid} from "../../features/Grid/Grid";
import {Point} from "../../features/Point";
import {BoxType} from "../Box/Box";

describe("Board", () => {
    it.each([
        [ new Grid(5) ],
        [ new Grid(5, 6) ],
        [ new Grid(5, 6, [ new Point(2, 3), new Point(3, 4)]) ],
    ])('should render grid: %s', function (grid: Grid) {
        const screen = render(<Board grid={grid} />);

        let elementsCount = 0;
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
                const element = screen.queryByTestId(`e_${row}_${col}`);

                expect(element).toBeInTheDocument();

                const possibleValues = grid.hasObstacleOnPoint(new Point(row, col))
                    ? [BoxType.Obstacle]
                    : [BoxType.NotVisited, BoxType.Rover, BoxType.Visited];

                const currentContent = [element?.textContent];

                expect(expect.arrayContaining(currentContent)).toEqual(possibleValues);

                elementsCount++;
            }
        }
        expect(elementsCount).toEqual(grid.rows * grid.cols);
    });
})
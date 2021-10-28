import {render} from "@testing-library/react";
import Board from "./Board";
import {Grid} from "../../features/Grid/Grid";

describe("Board", () => {
    it.each([
        [ new Grid(5) ],
    ])('should render grid', function (grid: Grid) {
        const screen = render(<Board grid={grid} />);

        let elementsCount = 0;
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.rows; col++) {
                const element = screen.queryByTestId(`e_${row}_${col}`);
                expect(element).toBeInTheDocument();
                elementsCount++;
            }
        }
        expect(elementsCount).toEqual(grid.rows * grid.cols);
    });
})
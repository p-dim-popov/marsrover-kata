import {render} from "@testing-library/react";
import Board from "./Board";
import {Grid} from "../../features/Grid/Grid";

describe("Board", () => {
    it.each([
        [ new Grid(5) ],
    ])('should render grid', function (grid: Grid) {
        const screen = render(<Board grid={grid} />);
        const elements = screen.queryAllByText("X");

        for (const element of elements) {
            expect(element).toBeInTheDocument();
        }
        expect(elements.length).toEqual(grid.rows * grid.cols);
    });
})
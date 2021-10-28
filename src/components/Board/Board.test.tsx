import {render} from "@testing-library/react";
import Board from "./Board";

describe("Board", () => {
    it('should render X', function () {
        const screen = render(<Board />);
        const element = screen.queryByText("X");

        expect(element).toBeInTheDocument();
    });
})
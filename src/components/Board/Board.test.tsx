import {fireEvent, render} from "@testing-library/react";
import Board, {ControlType} from "./Board";
import {Grid} from "../../features/Grid/Grid";
import {Point} from "../../features/Point";
import {BoxType} from "../Box/Box";

describe("Board", () => {
    const gridWithObstacle = new Grid(5, 6, [ new Point(2, 3), new Point(3, 4)]);

    it.each([
        [ new Grid(5) ],
        [ new Grid(5, 6) ],
        [ new Grid(5, 6, [ new Point(2, 3), new Point(3, 4)]) ],
    ])('should render grid: %s', function (grid: Grid) {
        const screen = render(<Board grid={grid} />);

        let elementsCount = 0;
        for (let row = 0; row < grid.cols; row++) {
            for (let col = 0; col < grid.rows; col++) {
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

    it.each([
        [ new Grid(5, 6, [ new Point(2, 3), new Point(3, 4)]) ],
    ])('should render grid with rover: %s', function (grid: Grid) {
        const screen = render(<Board grid={grid} />);
        const roverElement = screen.queryByText(BoxType.Rover);

        expect(roverElement).toBeInTheDocument();
    });

    describe("movement", () => {
        it('should move', function () {
            const screen = render(<Board grid={gridWithObstacle} />);

            fireEvent.keyDown(window, { key: ControlType.Move })

            const roverElement = screen.queryByTestId("e_0_1");
            expect(roverElement?.textContent).toEqual(BoxType.Rover);
        });

        it.each([
            [ControlType.RotateLeft],
            [ControlType.RotateRight],
        ])('should rotate (%s) without moving', function (direction: ControlType) {
            const screen = render(<Board grid={gridWithObstacle} />);

            fireEvent.keyDown(window, { key: direction })

            const roverElement = screen.queryByTestId("e_0_0");
            expect(roverElement?.textContent).toEqual(BoxType.Rover);
        });

        it.each([
            [ControlType.RotateLeft],
            [ControlType.RotateRight],
        ])('should rotate (%s) then move forward', function (direction: ControlType) {
            const screen = render(<Board grid={gridWithObstacle} />);

            fireEvent.keyDown(window, { key: direction })
            fireEvent.keyDown(window, { key: ControlType.Move })

            const roverElements = screen.queryAllByText(BoxType.Rover);
            expect(roverElements.length).toEqual(1);

            const roverElement = roverElements[0];

            let expected = "";
            switch (direction) {
                case ControlType.RotateLeft:
                    expected = "e_5_0";
                    break;
                case ControlType.RotateRight:
                    expected = "e_1_0";
                    break;
            }

            expect(roverElement?.dataset.testid).toEqual(expected);
        });
    });

    it("should show if blocked by obstacle", function () {
        const screen = render(<Board grid={gridWithObstacle} />);

        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.RotateRight });
        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.Move });

        const alertElement = screen.queryByText("BLOCKED BY OBSTACLE!");
        expect(alertElement).toBeInTheDocument();
    });

    it("should not show if was blocked by obstacle and now is not", function () {
        const screen = render(<Board grid={gridWithObstacle} />);

        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.RotateRight });
        fireEvent.keyDown(window, { key: ControlType.Move });
        fireEvent.keyDown(window, { key: ControlType.RotateRight });
        fireEvent.keyDown(window, { key: ControlType.Move });

        const alertElement = screen.queryByText("BLOCKED BY OBSTACLE!");
        expect(alertElement).not.toBeInTheDocument();
    });
})
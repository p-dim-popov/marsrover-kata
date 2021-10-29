import {fireEvent, render, screen} from "@testing-library/react";
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

        it("should rotate box with rover according to direction", function () {
            const screen = render(<Board grid={new Grid(5)} />);
            const roverElementWrapper = screen.queryByText(BoxType.Rover)?.parentElement;

            fireEvent.keyDown(window, { key: ControlType.RotateLeft });
            expect(roverElementWrapper?.className).toMatch(/transform/i);
            expect(roverElementWrapper?.className).toMatch(/rotate-180/i);

            fireEvent.keyDown(window, { key: ControlType.RotateLeft });
            expect(roverElementWrapper?.className).toMatch(/transform/i);
            expect(roverElementWrapper?.className).toMatch(/rotate-90/i);

            fireEvent.keyDown(window, { key: ControlType.RotateLeft });
            expect(roverElementWrapper?.className).toMatch(/transform/i);
            expect(roverElementWrapper?.className).toMatch(/ /i);

            fireEvent.keyDown(window, { key: ControlType.RotateLeft });
            expect(roverElementWrapper?.className).toMatch(/transform/i);
            expect(roverElementWrapper?.className).toMatch(/-rotate-90/i);
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

    it.each([
        [[ControlType.Move, ControlType.Move]],
    ])('should show trail', function (commands: ControlType[]) {
        const screen = render(<Board grid={new Grid(5)} />);

        commands.forEach(c => fireEvent.keyDown(window, { key: c }));

        const visitedBoxes = screen.queryAllByText(BoxType.Visited);
        expect(visitedBoxes.length).toBeGreaterThan(0)
    });

    describe("control buttons", () => {
        it('should have three control buttons under the grid', function () {
            render(<Board grid={gridWithObstacle} />);

            expect(screen.queryAllByText(/move forward|rotate left|rotate right/i)).toHaveLength(3);
        });

        it('should be in flexbox in row', function () {
            render(<Board grid={gridWithObstacle} />);

            const parentContainer = screen.queryByText(/move forward/i)?.parentElement;

            if (!parentContainer) {
                throw new Error("Not wrapped in container");
            }

            expect(parentContainer).toBeInTheDocument();

            expect(parentContainer.classList.contains("flex")).toBeTruthy();
            expect(parentContainer.classList.contains("flex-row")).toBeTruthy();
            expect(parentContainer.classList.contains("justify-between")).toBeTruthy();
            expect(parentContainer.classList.contains("content-center")).toBeTruthy();
        });


        it('should have rounded borders, gray background and black color', function () {
            render(<Board grid={gridWithObstacle} />);

            const button = screen.queryByText(/move forward/i);

            if (!button) {
                throw new Error("Not wrapped in container");
            }

            expect(button).toBeInTheDocument();

            expect(button.classList.contains("bg-gray-300")).toBeTruthy();
            expect(button.classList.contains("text-black")).toBeTruthy();
            expect(button.classList.contains("rounded")).toBeTruthy();
            expect(button.classList.contains("m-2")).toBeTruthy();
        });
    });
})
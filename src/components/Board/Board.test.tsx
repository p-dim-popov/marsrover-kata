import {fireEvent, render, screen} from "@testing-library/react";
import Board, {getPointFromIndex} from "./Board";
import {Grid, IGrid} from "../../features/Grid/Grid";
import {BoxType} from "../Box/Box";
import userEvent from "@testing-library/user-event";
import {IPoint, Point} from "../../features/Point/Point";

describe("Board", () => {
    const gridWithObstacle = Grid.new([5, 6], [{ x: 2, y: 3 }, { x: 3, y: 4 }]);

    it.each([
        [ Grid.new([5]) ],
        [ Grid.new([5, 6]) ],
        [ Grid.new([5, 6], [{ x: 2, y: 3 }, { x: 3, y: 4 }]) ],
    ])('should render grid: %s', function (grid: IGrid) {
        const screen = render(<Board grid={grid} />);

        let elementsCount = 0;
        for (let row = 0; row < grid.cols; row++) {
            for (let col = 0; col < grid.rows; col++) {
                const element = screen.queryByTestId(`e_${row}_${col}`);

                expect(element).toBeInTheDocument();

                const possibleValues = Grid.hasObstacleOnPoint({ x: row, y: col })(grid)
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
        [ Grid.new([5, 6], [ { x: 2, y: 3 }, { x: 3, y: 4 }]) ],
    ])('should render grid with rover: %s', function (grid: IGrid) {
        const screen = render(<Board grid={grid} />);
        const roverElement = screen.queryByText(BoxType.Rover);

        expect(roverElement).toBeInTheDocument();
    });

    describe("rover movement", () => {
        it('should move on keydown', function () {
            const screen = render(<Board grid={gridWithObstacle} />);

            fireEvent.keyDown(window, { key: "ArrowUp" })

            const roverElement = screen.queryByTestId("e_0_1");
            expect(roverElement?.textContent).toEqual(BoxType.Rover);
        });

        it.each([
            ["ArrowLeft"],
            ["ArrowRight"],
        ])('should rotate (%s) without moving', function (direction: string) {
            const screen = render(<Board grid={gridWithObstacle} />);

            fireEvent.keyDown(window, { key: direction })

            const roverElement = screen.queryByTestId("e_0_0");
            expect(roverElement?.textContent).toEqual(BoxType.Rover);
        });

        it.each([
            ["ArrowLeft"],
            ["ArrowRight"],
        ])("should rotate (%s) then move forward", function (direction: string) {
            const screen = render(<Board grid={gridWithObstacle} />);

            fireEvent.keyDown(window, { key: direction })
            fireEvent.keyDown(window, { key: "ArrowUp" })

            const roverElements = screen.queryAllByText(BoxType.Rover);
            expect(roverElements.length).toEqual(1);

            const roverElement = roverElements[0];

            let expected = "";
            switch (direction) {
                case "ArrowLeft":
                    expected = "e_5_0";
                    break;
                case "ArrowRight":
                    expected = "e_1_0";
                    break;
            }

            expect(roverElement?.dataset.testid).toEqual(expected);
        });

        it.each([
            ["ArrowLeft"],
            ["ArrowRight"]
        ])("should rotate box according to direction - (%s)", function (control: string) {
            const screen = render(<Board grid={Grid.new([5])} />);
            const roverElementWrapper = screen.queryByText(BoxType.Rover)?.parentElement;

            let rotateOrder = [
                /rotate-180/i,
                /rotate-90/i,
                / /i,
                /-rotate-90/i,
            ];

            if (control === "ArrowRight") {
                rotateOrder.reverse();
                rotateOrder.push(rotateOrder.shift() as RegExp);
            }

            rotateOrder.forEach((direction) => {
                fireEvent.keyDown(window, { key: control });
                expect(roverElementWrapper?.className).toMatch(/transform/i);
                expect(roverElementWrapper?.className).toMatch(direction);
            });
        });
    });

    it("should show alert if blocked by obstacle", function () {
        const screen = render(<Board grid={gridWithObstacle} />);

        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowRight" });
        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowUp" });

        const alertElement = screen.queryByText("BLOCKED BY OBSTACLE!");
        expect(alertElement).toBeInTheDocument();
    });

    it("should not show alert if was blocked by obstacle and now is not", function () {
        const screen = render(<Board grid={gridWithObstacle} />);

        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowRight" });
        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowRight" });
        fireEvent.keyDown(window, { key: "ArrowUp" });

        const alertElement = screen.queryByText("BLOCKED BY OBSTACLE!");
        expect(alertElement).not.toBeInTheDocument();
    });

    it.each([
        [["ArrowUp", "ArrowUp"]],
    ])('should show trail', function (controls: string[]) {
        const screen = render(<Board grid={Grid.new([5])} />);

        controls.forEach(c => fireEvent.keyDown(window, { key: c }));

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

        it('should move rover', function () {
            render(<Board grid={Grid.new([5])} />);
            const rover = screen.getByTestId("e_0_0");
            const moveButton = screen.getByText(/move forward/i);

            userEvent.click(moveButton);

            expect(rover.textContent).not.toEqual(BoxType.Rover);
        });

        it.each([
            ["left"],
            ["right"],
        ])('should rotate rover', function (buttonTextContentDirection: string) {
            render(<Board grid={Grid.new([5])} />);
            const roverClassName = screen.getByTestId("e_0_0").parentElement?.className;
            const regex = new RegExp(`rotate ${buttonTextContentDirection}`, "i");
            const moveButton = screen.getByText(regex);

            userEvent.click(moveButton);
            const rotatedRoverClassName = screen.getByTestId("e_0_0").parentElement?.className;
            expect(roverClassName).not.toEqual(rotatedRoverClassName);
        });
    });

    it('should be centered', function () {
        const { container } = render(<Board grid={Grid.new([5])} />);

        expect(Array.from(container.children).pop()?.classList.contains("items-center")).toBeTruthy();
    });

    it('should have margin between message, grid and controls', function () {
        const { container } = render(<Board grid={Grid.new([5])} />);

        expect(Array.from(container.children).pop()?.classList.contains("space-x-5")).toBeTruthy();
        expect(Array.from(container.children).pop()?.classList.contains("space-y-5")).toBeTruthy();
    });

    it("should have status container with fixed width", function () {
        render(<Board grid={Grid.new([2], [{x: 0, y: 1}])} />);

        fireEvent.keyDown(window, { key: "ArrowUp" });
        fireEvent.keyDown(window, { key: "ArrowUp" });

        const statusContainer = screen.queryByText("BLOCKED BY OBSTACLE!")?.parentElement;
        expect(statusContainer?.classList.contains("h-10")).toBeTruthy();

        fireEvent.keyDown(window, { key: "ArrowLeft" });
        expect(statusContainer?.classList.contains("h-10")).toBeTruthy();
    });

    describe("getPointFromIndex", () => {
        it.each([
            [2, { x: 2, y: 0 }, Grid.new([3, 5])],
            [0, { x: 0, y: 0 }, Grid.new([3, 5])],
            [8, { x: 3, y: 1 }, Grid.new([3, 5])],
            [2, { x: 2, y: 0 }, Grid.new([5, 3])],
            [0, { x: 0, y: 0 }, Grid.new([5, 3])],
            [8, { x: 2, y: 2 }, Grid.new([5, 3])],
        ])("should work as expected - index: %s -> point: %s // board: %s", function (index: number, expected: IPoint, grid: IGrid) {
            const result = getPointFromIndex(index, grid);
            expect(result.x).toEqual(expected.x);
            expect(result.y).toEqual(expected.y);
        });
    })
})

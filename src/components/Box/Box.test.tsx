import {render} from "@testing-library/react";
import Box, {BoxType} from "./Box";

describe("Box", () => {
    it.each([
        [BoxType.Rover],
        [BoxType.Obstacle],
        [BoxType.Visited],
        [BoxType.NotVisited],
    ])('should render correct element', function (type: BoxType) {
        const screen = render(<Box type={type} />);
        const element = screen.queryByText(type);

        expect(element).toBeInTheDocument();
    });

    it("should be circle and centered", function () {
        const screen = render(<Box type={BoxType.Rover} />);
        const element = screen.queryByText(BoxType.Rover);

        expect(element?.className).toMatch(/h-10/i)
        expect(element?.className).toMatch(/w-10/i)
        expect(element?.className).toMatch(/rounded-full/i)
        expect(element?.className).toMatch(/flex/i)
        expect(element?.className).toMatch(/items-center/i)
        expect(element?.className).toMatch(/justify-center/i)
    });
})
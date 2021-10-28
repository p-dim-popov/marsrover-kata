import {render} from "@testing-library/react";
import Box, {BoxType} from "./Box";

describe("Box", () => {
    it.each([
        [BoxType.Rover],
        [BoxType.Obstacle],
        [BoxType.Visited],
        [BoxType.Empty],
    ])('should render correct element', function (type: BoxType) {
        const screen = render(<Box type={type} />);
        const element = screen.queryByText(type);

        expect(element).toBeInTheDocument();
    });
})
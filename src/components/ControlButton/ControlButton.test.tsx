import {render, screen} from "@testing-library/react";
import ControlButton from "./ControlButton";

describe("ControlButton", () => {
    it('should have rounded borders, gray background and black color', function () {
        render(<ControlButton>TEST</ControlButton>);

        const button = screen.queryByText("TEST");
        expect(button).toBeInTheDocument();

        expect(button?.classList.contains("bg-gray-300")).toBeTruthy();
        expect(button?.classList.contains("text-black")).toBeTruthy();
        expect(button?.classList.contains("rounded")).toBeTruthy();
        expect(button?.classList.contains("m-2")).toBeTruthy();
    });
})
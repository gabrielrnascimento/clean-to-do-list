/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen } from "@testing-library/react";
import { ResizableInputText } from "../../src/components/resizable-input-text";

type SutTypes = {
    placeholder: string;
};

const makeSut = (placeholder: string = "any placeholder"): SutTypes => {
    render(<ResizableInputText placeholder={placeholder} />);
    return { placeholder };
};

describe("ResizableInputText", () => {
    test("should display correct initial values", () => {
        const { placeholder } = makeSut();
        const span = screen.getByTestId("resizable-text") as HTMLSpanElement;
        const input = screen.getByTestId("resizable-input") as HTMLInputElement;

        expect(span.textContent).toBe(placeholder);
        expect(input.placeholder).toBe(placeholder);
        expect(input.value).toBe("");
    });

    test("should have correct styles for resizable components", () => {
        makeSut();
        const container = screen.getByTestId(
            "resizable-container"
        ) as HTMLDivElement;
        const resizableText = screen.getByTestId(
            "resizable-text"
        ) as HTMLSpanElement;
        const resizableInput = screen.getByTestId(
            "resizable-input"
        ) as HTMLInputElement;
        const resizableContainerStyle = {
            position: "relative",
            display: "inline-block",
        };
        const resizableTextStyle = {
            margin: "0",
            padding: "0 0.4rem 0 0.2rem",
            fontSize: "inherit",
            fontFamily: "sans-serif",
            display: "inline-block",
            visibility: "hidden",
            whiteSpace: "pre",
        };
        const resizableInputStyle = {
            margin: "0",
            padding: "0 0.2rem",
            fontSize: "inherit",
            fontFamily: "sans-serif",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "transparent",
            outline: "none",
            color: "#fff",
            border: "none",
        };

        expect(container).toHaveStyle(resizableContainerStyle);
        expect(resizableText).toHaveStyle(resizableTextStyle);
        expect(resizableText).not.toBeVisible();
        expect(resizableInput).toHaveStyle(resizableInputStyle);
    });
});

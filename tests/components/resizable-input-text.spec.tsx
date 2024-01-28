/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { fireEvent, render, screen } from "@testing-library/react";
import { ResizableInputText } from "../../src/components/resizable-input-text";

type SutTypes = {
    placeholder: string;
    value?: string;
    style?: React.CSSProperties;
    onBlurMock: jest.Mock;
};

const makeSut = (
    placeholder: string = "any placeholder",
    value: string = "any value",
    style?: React.CSSProperties
): SutTypes => {
    const onBlurMock = jest.fn();
    render(
        <ResizableInputText
            placeholder={placeholder}
            value={value}
            onBlur={onBlurMock}
            style={style}
        />
    );
    return { placeholder, value, onBlurMock };
};

describe("ResizableInputText", () => {
    test("should display correct initial values", () => {
        const { placeholder, value } = makeSut();
        const resizableText = screen.getByTestId(
            "resizable-text"
        ) as HTMLSpanElement;
        const resizableInput = screen.getByTestId(
            "resizable-input"
        ) as HTMLInputElement;

        expect(resizableText.textContent).toBe(value);
        expect(resizableInput.placeholder).toBe(placeholder);
        expect(resizableInput.value).toBe(value);
    });

    test("should have correct styles for resizable components", () => {
        makeSut();
        const resizableContainer = screen.getByTestId(
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

        expect(resizableContainer).toHaveStyle(resizableContainerStyle);
        expect(resizableText).toHaveStyle(resizableTextStyle);
        expect(resizableText).not.toBeVisible();
        expect(resizableInput).toHaveStyle(resizableInputStyle);
    });

    test("should call onBlur with correct value", () => {
        const { onBlurMock } = makeSut();
        const resizableInput = screen.getByTestId(
            "resizable-input"
        ) as HTMLInputElement;

        fireEvent.change(resizableInput, { target: { value: "any value" } });
        fireEvent.blur(resizableInput);

        expect(onBlurMock).toHaveBeenCalledWith("any value");
    });

    test("should apply style to input when received in props", () => {
        const style = { color: "red" };
        makeSut("any placeholder", "any value", style);
        const resizableInput = screen.getByTestId(
            "resizable-input"
        ) as HTMLInputElement;

        expect(resizableInput).toHaveStyle(style);
    });
});

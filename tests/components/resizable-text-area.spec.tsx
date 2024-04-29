/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { fireEvent, render, screen } from "@testing-library/react";
import { ResizableTextArea } from "../../src/components/resizable-text-area.tsx";

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
        <ResizableTextArea
            placeholder={placeholder}
            value={value}
            onBlur={onBlurMock}
            style={style}
        />
    );
    return { placeholder, value, onBlurMock };
};

describe("ResizableTextarea", () => {
    test("should should display correct initial values", () => {
        const { placeholder, value } = makeSut();
        const resizableInput = screen.getByTestId(
            "resizable-input"
        ) as HTMLTextAreaElement;

        expect(resizableInput.textContent).toBe(value);
        expect(resizableInput.placeholder).toBe(placeholder);
        expect(resizableInput.value).toBe(value);
    });

    test("should display placeholder when value is empty", () => {
        const { placeholder } = makeSut("any placeholder", "");
        const resizableInput = screen.getByTestId(
            "resizable-input"
        ) as HTMLTextAreaElement;

        expect(resizableInput.placeholder).toBe(placeholder);
    });

    test("should have correct styles for resizable components", () => {
        makeSut();
        const resizableTextArea = screen.getByTestId(
            "resizable-input"
        ) as HTMLTextAreaElement;
        const resizableTextAreaStyle = {
            "font-size": "inherit",
            "font-family": "sans-serif",

            "background-color": "transparent",
            outline: "none",
            color: "#fff",
            border: "none",
            resize: "none",

            display: "flex",
            flex: "1",
        };

        expect(resizableTextArea).toHaveStyle(resizableTextAreaStyle);
    });

    test("should call onBlur with correct value", () => {
        const { onBlurMock } = makeSut();
        const resizableInput = screen.getByTestId(
            "resizable-input"
        ) as HTMLTextAreaElement;
        const newInputValue = "new value";

        fireEvent.change(resizableInput, {
            target: { value: newInputValue },
        });
        fireEvent.blur(resizableInput);

        expect(resizableInput).toHaveValue(newInputValue);
        expect(onBlurMock).toHaveBeenCalledWith(newInputValue);
    });

    test("should apply style to input when received in props", () => {
        const style = { color: "red" };
        makeSut("any placeholder", "any value", style);
        const resizableInput = screen.getByTestId(
            "resizable-input"
        ) as HTMLTextAreaElement;

        expect(resizableInput).toHaveStyle(style);
    });
});

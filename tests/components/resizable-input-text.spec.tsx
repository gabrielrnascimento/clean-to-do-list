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
});

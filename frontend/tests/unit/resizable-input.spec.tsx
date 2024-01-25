/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { ResizableInput } from "@/components/resizable-input";
import React, { render, screen, fireEvent } from "@testing-library/react";

type SutTypes = {
    placeholder: string;
    handleChangeMock: jest.Mock;
};

const makeSut = (placeholder = "any placeholder"): SutTypes => {
    const handleChangeMock = jest.fn();
    render(
        <ResizableInput
            placeholder={placeholder}
            handleChange={handleChangeMock}
        />
    );

    return {
        placeholder,
        handleChangeMock,
    };
};

describe("ResizableInput", () => {
    test("should display correct value and placeholder text", () => {
        const { placeholder } = makeSut();

        const input = screen.getByTestId(
            "resizable-input-content"
        ) as HTMLInputElement;

        expect(input.value).toBe("");
        expect(input.placeholder).toBe(placeholder);
    });

    test("should call handleChange on blur", () => {
        const { handleChangeMock } = makeSut();
        const input = screen.getByTestId(
            "resizable-input-content"
        ) as HTMLInputElement;

        fireEvent.blur(input);

        expect(handleChangeMock).toHaveBeenCalled();
    });

    test("should update input value on change", () => {
        makeSut();
        const input = screen.getByTestId(
            "resizable-input-content"
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "new value" } });

        expect(input.value).toBe("new value");
    });

    test("should call handleChange with the updated input value on blur", () => {
        const { handleChangeMock } = makeSut();
        const input = screen.getByTestId(
            "resizable-input-content"
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "new value" } });
        fireEvent.blur(input);

        expect(handleChangeMock).toHaveBeenCalledWith("new value");
    });
});

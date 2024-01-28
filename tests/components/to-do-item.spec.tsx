/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen } from "@testing-library/react";
import { ToDoItem } from "../../src/components/to-do-item";
import { type ResizableInputProps } from "../../src/components/resizable-input-text";

const resizableInputTextMock = jest.fn();

jest.mock("../../src/components/resizable-input-text", () => ({
    ResizableInputText: (props: ResizableInputProps) => {
        resizableInputTextMock(props);
        return <div data-testid="resizable-input-text-mock"></div>;
    },
}));

type SutTypes = {
    description: string;
    onDescriptionChangeMock: jest.Mock;
};

const makeSut = (description: string = "any description"): SutTypes => {
    const onDescriptionChangeMock = jest.fn();
    render(
        <ToDoItem
            description={description}
            onDescriptionChange={onDescriptionChangeMock}
        />
    );

    return {
        description,
        onDescriptionChangeMock,
    };
};

describe("ToDoItem", () => {
    test("should display correct initial values", () => {
        const { description, onDescriptionChangeMock } = makeSut();
        const status = screen.getByRole("checkbox") as HTMLInputElement;
        const resizableInputText = screen.getByTestId(
            "resizable-input-text-mock"
        );
        const deleteButton = screen.getByRole("button", {
            name: "delete to-do",
        });

        expect(status.checked).toBe(false);
        expect(resizableInputText).toBeInTheDocument();
        expect(resizableInputTextMock).toHaveBeenCalledWith({
            placeholder: "new to-do",
            value: description,
            onBlur: onDescriptionChangeMock,
        });
        expect(deleteButton.textContent).toBe("delete to-do");
    });
});

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoItem } from "@/components/to-do-item";

const resizableInputMock = jest.fn();

jest.mock("../../src/components/resizable-input", () => ({
    ResizableInput: (props: any) => {
        resizableInputMock(props);
        return <div data-testid="resizable-input-mock" />;
    },
}));

type SutTypes = {
    onChangeMock: jest.Mock;
    onDeleteMock: jest.Mock;
};

const makeSut = (): SutTypes => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();

    render(
        <ToDoItem
            content="Sample Todo"
            onChange={onChangeMock}
            onDelete={onDeleteMock}
        />
    );

    return {
        onChangeMock,
        onDeleteMock,
    };
};

describe("ToDoItem", () => {
    test("should render a todo item with default values", () => {
        makeSut();
        const todo = screen.getByTestId("to-do-item");
        const statusCheckbox = screen.getByTestId("to-do-status");
        const deleteButton = screen.getByTestId("to-do-delete-button");

        expect(todo).toBeInTheDocument();
        expect(statusCheckbox).toBeInTheDocument();
        expect(statusCheckbox).not.toBeChecked();
        expect(deleteButton).toBeInTheDocument();
    });

    test("should pass correct props to ResizableInput component", () => {
        const { onChangeMock } = makeSut();
        const resizableInput = screen.getByTestId("resizable-input-mock");

        expect(resizableInput).toBeInTheDocument();
        expect(resizableInputMock).toHaveBeenCalledWith({
            placeholder: "new to do",
            handleChange: onChangeMock,
        });
    });

    test("should toggle the status when checkbox is clicked", () => {
        makeSut();
        const statusCheckbox = screen.getByTestId("to-do-status");

        fireEvent.click(statusCheckbox);

        expect(statusCheckbox).toBeChecked();

        fireEvent.click(statusCheckbox);

        expect(statusCheckbox).not.toBeChecked();
    });

    test("should call onDelete when delete button is clicked", () => {
        const { onDeleteMock } = makeSut();
        const deleteButton = screen.getByTestId("to-do-delete-button");

        fireEvent.click(deleteButton);

        expect(onDeleteMock).toHaveBeenCalled();
    });
});

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { fireEvent, render, screen } from "@testing-library/react";
import { ToDoItem } from "../../src/components/to-do-item";
import { type ResizableInputProps } from "../../src/components/resizable-input-text";

const resizableInputTextMock = jest.fn();

jest.mock("../../src/components/resizable-input-text", () => ({
    ResizableInputText: (props: ResizableInputProps) => {
        resizableInputTextMock(props);
        return <div data-testid="resizable-input-text-mock"></div>;
    },
}));

type SutParams = {
    description?: string;
    shouldHover?: boolean;
};

type SutTypes = {
    description: string;
    toDoContainer: HTMLElement;
    onDescriptionChangeMock: jest.Mock;
    onDeleteMock: jest.Mock;
    onStatusChangeMock: jest.Mock;
};

const makeSut = ({
    description = "any description",
    shouldHover = true,
}: SutParams = {}): SutTypes => {
    const onDescriptionChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onStatusChangeMock = jest.fn();

    render(
        <ToDoItem
            description={description}
            isDone={false}
            onDescriptionChange={onDescriptionChangeMock}
            onDelete={onDeleteMock}
            onStatusChange={onStatusChangeMock}
        />
    );

    const toDoContainer = screen.getByTestId("to-do-item-container");
    if (shouldHover) {
        fireEvent.mouseEnter(toDoContainer);
    }

    return {
        description,
        toDoContainer,
        onDescriptionChangeMock,
        onDeleteMock,
        onStatusChangeMock,
    };
};

describe("ToDoItem", () => {
    test("should display correct initial values", () => {
        const { description, onDescriptionChangeMock } = makeSut();
        const status = screen.getByTestId(
            "status-checkbox"
        ) as HTMLInputElement;
        const resizableInputText = screen.getByTestId(
            "resizable-input-text-mock"
        );
        const deleteButton = screen.getByTestId("delete-button");

        expect(status.checked).toBe(false);
        expect(resizableInputText).toBeInTheDocument();
        expect(resizableInputTextMock).toHaveBeenCalledWith({
            placeholder: "new to-do",
            value: description,
            onBlur: onDescriptionChangeMock,
        });
        expect(deleteButton.textContent).toBe("delete to-do");
    });

    test("should call onDelete on delete button click", () => {
        const { onDeleteMock } = makeSut();
        const deleteButton = screen.getByTestId("delete-button");

        fireEvent.click(deleteButton);

        expect(onDeleteMock).toHaveBeenCalledTimes(1);
    });

    test("should call onStatusChange on checkbox click", () => {
        const { onStatusChangeMock } = makeSut();
        const status = screen.getByTestId(
            "status-checkbox"
        ) as HTMLInputElement;
        fireEvent.click(status);

        expect(status.checked).toBe(true);
        expect(onStatusChangeMock).toHaveBeenCalledTimes(1);
    });

    test("should pass correct style when status is checked", () => {
        const { description, onDescriptionChangeMock } = makeSut();
        const status = screen.getByTestId(
            "status-checkbox"
        ) as HTMLInputElement;
        fireEvent.click(status);

        expect(resizableInputTextMock).toHaveBeenCalledWith({
            placeholder: "new to-do",
            value: description,
            onBlur: onDescriptionChangeMock,
            style: {
                textDecoration: "line-through",
                opacity: 0.5,
            },
        });
    });

    test("should not display delete button and status checkbox", () => {
        makeSut({ shouldHover: false });
        const deleteButton = screen.queryByTestId("delete-button");
        const status = screen.queryByTestId("status-checkbox");

        expect(deleteButton).toBeNull();
        expect(status).toBeNull();
    });

    test("should display delete button and status checkbox on hover", async () => {
        const { toDoContainer } = makeSut();

        fireEvent.mouseEnter(toDoContainer);
        const deleteButton = screen.getByTestId("delete-button");
        const status = screen.getByTestId(
            "status-checkbox"
        ) as HTMLInputElement;

        expect(deleteButton).toBeVisible();
        expect(status).toBeVisible();
    });
});

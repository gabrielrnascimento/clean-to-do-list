import { fireEvent, render, screen } from "@testing-library/react";
import { ToDoList } from "../../src/components/to-do-list";
import { type ToDoItemProps } from "../../src/components/to-do-item";

const toDoItemMock = jest.fn();

jest.mock("../../src/components/to-do-item", () => ({
    ToDoItem: (props: ToDoItemProps) => {
        toDoItemMock(props);
        return <div data-testid="to-do-item-mock"></div>;
    },
}));

const makeSut = (): void => {
    render(<ToDoList />);
};

describe("ToDoList", () => {
    test("should display correct initial values", () => {
        makeSut();
        const title = screen.getByRole("heading", { name: "things to do" });
        const addButton = screen.getByRole("button", { name: "add to-do" });

        expect(title.textContent).toBe("things to do");
        expect(addButton.textContent).toBe("add to-do");
    });

    test("should add a to-do ", () => {
        makeSut();
        const addButton = screen.getByRole("button", { name: "add to-do" });

        fireEvent.click(addButton);
        fireEvent.click(addButton);
        const toDos = screen.getAllByTestId("to-do-item-mock");

        expect(toDos.length).toBe(2);
    });

    test("should call ToDoItem with correct props", () => {
        makeSut();
        const addButton = screen.getByRole("button", { name: "add to-do" });

        fireEvent.click(addButton);

        expect(toDoItemMock).toHaveBeenNthCalledWith(1, {
            description: "",
            onDescriptionChange: expect.any(Function),
            onDelete: expect.any(Function),
        });
    });
});

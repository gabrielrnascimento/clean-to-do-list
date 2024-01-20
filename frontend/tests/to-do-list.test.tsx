import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ToDoList } from "@/components/to-do-list";

describe("ToDoList", () => {
    test("should display correct text", () => {
        render(<ToDoList />);

        const title = screen.getByTestId("title");
        const addButton = screen.getByTestId("add-button");

        expect(title.textContent).toBe("things to do");
        expect(addButton.textContent).toBe("add to do");
    });

    test("should add a todo", () => {
        render(<ToDoList />);

        const addButton = screen.getByTestId("add-button");

        fireEvent.click(addButton);

        const todo = screen.getAllByTestId("todo");

        expect(todo.length).toBe(1);
        expect(todo[0].textContent).toBe("new todo");
    });
});

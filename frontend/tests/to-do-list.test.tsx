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

        const todos = screen.getAllByTestId("content");
        const todo = todos[0] as HTMLInputElement;

        expect(todos.length).toBe(1);
        expect(todo.value).toBe("new todo");
    });

    test("should edit a todo text content", () => {
        render(<ToDoList />);

        const addButton = screen.getByTestId("add-button");

        fireEvent.click(addButton);

        const todos = screen.getAllByTestId("content");

        const todo = todos[0] as HTMLInputElement;

        fireEvent.change(todo, { target: { value: "changed todo" } });
        fireEvent.blur(todo);

        expect(todo.value).toBe("changed todo");
    });

    test("should mark a todo as done", () => {
        render(<ToDoList />);

        const addButton = screen.getByTestId("add-button");

        fireEvent.click(addButton);

        const todoCheckbox = screen.getByTestId("status");

        fireEvent.click(todoCheckbox);

        expect(todoCheckbox).toBeChecked();

        fireEvent.click(todoCheckbox);

        expect(todoCheckbox).not.toBeChecked();
    });
});

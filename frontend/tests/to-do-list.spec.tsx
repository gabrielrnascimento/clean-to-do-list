import "@testing-library/jest-dom";
import React, { fireEvent, render, screen } from "@testing-library/react";
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
        const todos = screen.getAllByTestId("to-do-item");

        expect(todos.length).toBe(1);
    });

    test("should mark a todo as done", () => {
        render(<ToDoList />);
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        const todoCheckbox = screen.getByTestId("to-do-status");

        fireEvent.click(todoCheckbox);

        expect(todoCheckbox).toBeChecked();

        fireEvent.click(todoCheckbox);

        expect(todoCheckbox).not.toBeChecked();
    });

    test("should delete a todo", () => {
        render(<ToDoList />);
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        const todo = screen.getByTestId("to-do-item");
        const deleteButton = screen.getByTestId("to-do-delete-button");

        expect(todo).toBeInTheDocument();

        fireEvent.click(deleteButton);

        expect(todo).not.toBeInTheDocument();
    });
});

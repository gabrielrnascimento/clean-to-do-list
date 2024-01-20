import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ToDoList } from "@/components/to-do-list";

describe("ToDoList", () => {
    test("should display correct text", () => {
        render(<ToDoList />);

        const title = screen.getByTestId("title");
        const addButton = screen.getByTestId("add-button");

        expect(title.textContent).toBe("things to do");
        expect(addButton.textContent).toBe("add to do");
    });
});

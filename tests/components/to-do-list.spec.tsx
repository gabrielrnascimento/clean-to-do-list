import { render, screen } from "@testing-library/react";
import { ToDoList } from "../../src/components/to-do-list";

describe("ToDoList", () => {
    test("should display correct initial content", () => {
        render(<ToDoList />);

        const title = screen.getByRole("heading", { name: "things to do" });
        const addButton = screen.getByRole("button", { name: "add to-do" });

        expect(title.textContent).toBe("things to do");
        expect(addButton.textContent).toBe("add to-do");
    });
});

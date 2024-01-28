/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen } from "@testing-library/react";
import { ToDoItem } from "../../src/components/to-do-item";

describe("ToDoItem", () => {
    test("should display correct initial values", () => {
        render(<ToDoItem />);
        const status = screen.getByRole("checkbox") as HTMLInputElement;
        const text = screen.getByRole("textbox") as HTMLInputElement;
        const deleteButton = screen.getByRole("button", {
            name: "delete to-do",
        });

        expect(status.checked).toBe(false);
        expect(text.placeholder).toBe("new to-do");
        expect(deleteButton.textContent).toBe("delete to-do");
    });
});

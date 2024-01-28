import { fireEvent, render, screen } from "@testing-library/react";
import { ToDoList } from "../../src/components/to-do-list";

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

    test("should add a to-do with correct values ", () => {
        makeSut();
        const addButton = screen.getByRole("button", { name: "add to-do" });

        fireEvent.click(addButton);
        fireEvent.click(addButton);
        const toDos = screen.getAllByRole("listitem");

        expect(toDos.length).toBe(2);
        expect(toDos[0].textContent).toBe("new to-do");
        expect(toDos[1].textContent).toBe("new to-do");
    });
});

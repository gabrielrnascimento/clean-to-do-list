import { fireEvent, render, screen } from "@testing-library/react";
import { ToDoList } from "../../src/components/to-do-list";
import { type ToDoItemProps } from "../../src/components/to-do-item";
import { type ListToDosUseCase } from "../../src/@core/domain/usecases/list-to-dos.usecase";
import { type ToDo } from "../../src/@core/domain/entities";
import { makeMockToDos } from "../mocks";

const toDoItemMock = jest.fn();
jest.mock("../../src/components/to-do-item", () => ({
    ToDoItem: (props: ToDoItemProps) => {
        toDoItemMock(props);
        return <div data-testid="to-do-item-mock"></div>;
    },
}));

class ListToDosUseCaseSpy implements ListToDosUseCase {
    response = makeMockToDos();
    callsCount = 0;

    async listToDos(): Promise<ToDo[]> {
        this.callsCount++;
        return this.response;
    }
}

type SutTypes = {
    listToDosUseCaseSpy: ListToDosUseCaseSpy;
};

const makeSut = (): SutTypes => {
    const listToDosUseCaseSpy = new ListToDosUseCaseSpy();
    render(<ToDoList listToDosUseCase={listToDosUseCaseSpy} />);

    return {
        listToDosUseCaseSpy,
    };
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
            isDone: false,
            onDescriptionChange: expect.any(Function),
            onDelete: expect.any(Function),
            onStatusChange: expect.any(Function),
        });
    });

    test("should call ListToDos usecase on page load", async () => {
        const { listToDosUseCaseSpy } = makeSut();

        expect(listToDosUseCaseSpy.callsCount).toBe(1);
    });
});

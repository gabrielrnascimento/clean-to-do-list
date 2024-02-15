import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
type SutParams = {
    listToDosUseCaseResponse?: ToDo[];
};

type SutTypes = {
    listToDosUseCaseSpy: ListToDosUseCaseSpy;
};

const makeSut = ({
    listToDosUseCaseResponse: response,
}: SutParams = {}): SutTypes => {
    const listToDosUseCaseSpy = new ListToDosUseCaseSpy();
    if (response != null) listToDosUseCaseSpy.response = response;

    render(<ToDoList listToDosUseCase={listToDosUseCaseSpy} />);

    return {
        listToDosUseCaseSpy,
    };
};

describe("ToDoList", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should display correct initial values", async () => {
        makeSut();
        const title = await screen.findByRole("heading", {
            name: "things to do",
        });
        const addButton = await screen.findByRole("button", {
            name: "add to-do",
        });

        expect(title.textContent).toBe("things to do");
        expect(addButton.textContent).toBe("add to-do");
    });

    test("should add a to-do ", async () => {
        makeSut({ listToDosUseCaseResponse: [] });

        const addButton = await screen.findByRole("button", {
            name: "add to-do",
        });

        fireEvent.click(addButton);
        fireEvent.click(addButton);
        const toDos = screen.getAllByTestId("to-do-item-mock");

        expect(toDos.length).toBe(2);
    });

    test("should call ToDoItem with correct props", async () => {
        makeSut({ listToDosUseCaseResponse: [] });

        const addButton = await screen.findByRole("button", {
            name: "add to-do",
        });

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

        await waitFor(() => {
            expect(listToDosUseCaseSpy.callsCount).toBe(1);
        });
    });

    test("should populate to-dos with ListToDos response on page load", async () => {
        const { listToDosUseCaseSpy } = makeSut();

        await waitFor(() => {
            const toDos = screen.getAllByTestId("to-do-item-mock");

            expect(toDos.length).toBe(listToDosUseCaseSpy.response.length);
            toDos.forEach((toDo, index) => {
                expect(toDoItemMock).toHaveBeenNthCalledWith(index + 1, {
                    description:
                        listToDosUseCaseSpy.response[index].description,
                    isDone: listToDosUseCaseSpy.response[index].isDone,
                    onDescriptionChange: expect.any(Function),
                    onDelete: expect.any(Function),
                    onStatusChange: expect.any(Function),
                });
            });
        });
    });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "../../src/components/to-do-list";
import { type ToDoItemProps } from "../../src/components/to-do-item";
import { type ToDo } from "../../src/@core/domain/entities";
import {
    CreateToDoUseCaseSpy,
    DeleteToDoUseCaseSpy,
    ListToDosUseCaseSpy,
    UpdateToDoUseCaseSpy,
} from "../mocks";
import { ToDoProvider } from "../../src/contexts/to-do";

const toDoItemMock = jest.fn();
jest.mock("../../src/components/to-do-item", () => ({
    ToDoItem: (props: ToDoItemProps) => {
        toDoItemMock(props);
        return <input data-testid="to-do-item-mock"></input>;
    },
}));

type SutParams = {
    listToDosUseCaseResponse?: ToDo[];
};

type SutTypes = {
    listToDosUseCaseSpy: ListToDosUseCaseSpy;
    createToDoUseCaseSpy: CreateToDoUseCaseSpy;
    updateToDoUseCaseSpy: UpdateToDoUseCaseSpy;
    deleteToDoUseCaseSpy: DeleteToDoUseCaseSpy;
};

const makeSut = ({
    listToDosUseCaseResponse: response,
}: SutParams = {}): SutTypes => {
    const listToDosUseCaseSpy = new ListToDosUseCaseSpy();
    const createToDoUseCaseSpy = new CreateToDoUseCaseSpy();
    const updateToDoUseCaseSpy = new UpdateToDoUseCaseSpy();
    const deleteToDoUseCaseSpy = new DeleteToDoUseCaseSpy();
    if (response != null) listToDosUseCaseSpy.response = response;

    render(
        <ToDoProvider
            listToDosUseCase={listToDosUseCaseSpy}
            createToDoUseCase={createToDoUseCaseSpy}
            updateToDoUseCase={updateToDoUseCaseSpy}
            deleteToDoUseCase={deleteToDoUseCaseSpy}
        >
            <ToDoList />
        </ToDoProvider>
    );

    return {
        listToDosUseCaseSpy,
        createToDoUseCaseSpy,
        updateToDoUseCaseSpy,
        deleteToDoUseCaseSpy,
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

    test("should call CreateToDoUseCase on button click", async () => {
        const { createToDoUseCaseSpy } = makeSut({
            listToDosUseCaseResponse: [],
        });

        const addButton = await screen.findByRole("button", {
            name: "add to-do",
        });

        fireEvent.click(addButton);

        await waitFor(() => {
            expect(createToDoUseCaseSpy.callsCount).toBe(1);
        });
    });

    test("should call ListToDos use case on page load", async () => {
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
            toDos.forEach((_, index) => {
                expect(toDoItemMock).toHaveBeenNthCalledWith(index + 1, {
                    id: listToDosUseCaseSpy.response[index].id,
                    description:
                        listToDosUseCaseSpy.response[index].description,
                    isDone: listToDosUseCaseSpy.response[index].isDone,
                });
            });
        });
    });
});

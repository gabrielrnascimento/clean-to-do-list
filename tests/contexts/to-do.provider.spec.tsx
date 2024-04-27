import {
    CreateToDoUseCaseSpy,
    DeleteToDoUseCaseSpy,
    ListToDosUseCaseSpy,
    UpdateToDoUseCaseSpy,
} from "../mocks";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { ToDoContext, ToDoProvider } from "../../src/contexts/to-do";
import { ToDo } from "../../src/@core/domain/entities";

const ORIGINAL_TO_DO_DESCRIPTION = "original description";

type TestingComponentProps = {
    id?: string;
    newDescription: string;
    updateToDoDescription: (id: string, description: string) => Promise<void>;
    updateToDoStatus: (id: string, isDone: boolean) => Promise<void>;
    deleteToDo: (id: string) => Promise<void>;
    toDos?: ToDo[];
    refreshToDos?: () => Promise<void>;
};

const TestingComponent = ({
    id = "1",
    newDescription,
    updateToDoDescription,
    updateToDoStatus,
    deleteToDo,
    toDos,
}: TestingComponentProps): JSX.Element => {
    return (
        <>
            {toDos?.map((toDo, index) => (
                <div key={toDo.id}>
                    <span>{toDo.description}</span>
                    <button
                        data-testid={`update-description-button`}
                        onClick={() => {
                            void updateToDoDescription(toDo.id, newDescription);
                        }}
                    >
                        Update description
                    </button>
                    <button
                        data-testid={`update-status-button`}
                        onClick={() => {
                            void updateToDoStatus(id, true);
                        }}
                    >
                        Update status
                    </button>
                    <button
                        data-testid={`delete-button`}
                        onClick={() => {
                            void deleteToDo(id);
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </>
    );
};

type SutParams = {
    listToDosUseCaseSpy?: ListToDosUseCaseSpy;
    newDescription?: string;
};

type SutTypes = Promise<{
    listToDosUseCaseSpy: ListToDosUseCaseSpy;
    createToDoUseCaseSpy: CreateToDoUseCaseSpy;
    updateToDoUseCaseSpy: UpdateToDoUseCaseSpy;
    deleteToDoUseCaseSpy: DeleteToDoUseCaseSpy;
}>;

const makeSut = async ({
    listToDosUseCaseSpy = new ListToDosUseCaseSpy(),
    newDescription = ORIGINAL_TO_DO_DESCRIPTION,
}: SutParams = {}): SutTypes => {
    const createToDoUseCaseSpy = new CreateToDoUseCaseSpy();
    const updateToDoUseCaseSpy = new UpdateToDoUseCaseSpy();
    const deleteToDoUseCaseSpy = new DeleteToDoUseCaseSpy();

    await act(async () => {
        render(
            <ToDoProvider
                listToDosUseCase={listToDosUseCaseSpy}
                createToDoUseCase={createToDoUseCaseSpy}
                updateToDoUseCase={updateToDoUseCaseSpy}
                deleteToDoUseCase={deleteToDoUseCaseSpy}
            >
                <ToDoContext.Consumer>
                    {({
                        addToDo,
                        updateToDoDescription,
                        updateToDoStatus,
                        deleteToDo,
                        toDos,
                        refreshToDos,
                    }) => (
                        <>
                            <TestingComponent
                                newDescription={newDescription}
                                updateToDoDescription={updateToDoDescription}
                                updateToDoStatus={updateToDoStatus}
                                deleteToDo={deleteToDo}
                                toDos={toDos}
                                refreshToDos={refreshToDos}
                            />
                            <button
                                onClick={() => {
                                    void addToDo();
                                }}
                            >
                                Add to do
                            </button>
                        </>
                    )}
                </ToDoContext.Consumer>
            </ToDoProvider>
        );
    });

    return {
        listToDosUseCaseSpy,
        createToDoUseCaseSpy,
        updateToDoUseCaseSpy,
        deleteToDoUseCaseSpy,
    };
};

describe("ToDoProvider", () => {
    test("should call ListToDoUseCase on mount", async () => {
        const { listToDosUseCaseSpy } = await makeSut();

        expect(listToDosUseCaseSpy.callsCount).toBe(1);
    });

    test("should log error if ListToDoUseCase throws", async () => {
        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(() => {});
        const listToDosUseCaseSpy = new ListToDosUseCaseSpy();
        jest.spyOn(listToDosUseCaseSpy, "listToDos").mockRejectedValueOnce(
            new Error()
        );

        await makeSut({ listToDosUseCaseSpy });

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test("should call CreateToDoUseCase on button click", async () => {
        const { createToDoUseCaseSpy } = await makeSut();

        await act(async () => {
            fireEvent.click(screen.getByText("Add to do"));
        });

        expect(createToDoUseCaseSpy.callsCount).toBe(1);
    });

    test("should call DeleteToDoUseCase on handleDeleteToDo", async () => {
        const { deleteToDoUseCaseSpy } = await makeSut();

        const deleteButton = screen.getAllByTestId("delete-button")[0];
        await waitFor(() => {
            fireEvent.click(deleteButton);
        });

        expect(deleteToDoUseCaseSpy.callsCount).toBe(1);
    });

    test("should call UpdateToDoUseCase on handleToDoDescriptionChange", async () => {
        const { updateToDoUseCaseSpy } = await makeSut();

        const updateDescriptionButton = screen.getAllByTestId(
            "update-description-button"
        )[0];
        await waitFor(() => {
            fireEvent.click(updateDescriptionButton);
        });

        expect(updateToDoUseCaseSpy.callsCount).toBe(1);
    });

    test("should not call UpdateToDoUseCase on handleToDoDescriptionChange if description is the same", async () => {
        const listToDosUseCaseSpy = new ListToDosUseCaseSpy();
        listToDosUseCaseSpy.response = [
            new ToDo({
                id: "1",
                description: ORIGINAL_TO_DO_DESCRIPTION,
                isDone: false,
            }),
        ];
        const { updateToDoUseCaseSpy } = await makeSut({
            listToDosUseCaseSpy,
            newDescription: ORIGINAL_TO_DO_DESCRIPTION,
        });

        const updateDescriptionButton = screen.getByTestId(
            "update-description-button"
        );
        await waitFor(() => {
            fireEvent.click(updateDescriptionButton);
        });

        expect(updateToDoUseCaseSpy.callsCount).toBe(0);
    });

    test("should call UpdateToDoUseCase on handleStatusChange", async () => {
        const { updateToDoUseCaseSpy } = await makeSut();

        const updateToDoStatusButton = screen.queryAllByTestId(
            "update-status-button"
        )[0];
        await waitFor(() => {
            fireEvent.click(updateToDoStatusButton);
        });

        expect(updateToDoUseCaseSpy.callsCount).toBe(1);
    });
});

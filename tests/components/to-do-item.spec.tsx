/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { ToDoItem } from "../../src/components/to-do-item";
import { type ResizableInputProps } from "../../src/components/resizable-input-text";
import {
    CreateToDoUseCaseSpy,
    DeleteToDoUseCaseSpy,
    ListToDosUseCaseSpy,
    UpdateToDoUseCaseSpy,
} from "../mocks";
import { ToDoProvider } from "../../src/contexts/to-do";
import type { ToDo } from "../../src/@core/domain/entities";

const resizableInputTextMock = jest.fn();

jest.mock("../../src/components/resizable-input-text", () => ({
    ResizableInputText: (props: ResizableInputProps) => {
        resizableInputTextMock(props);

        return (
            <div data-testid="resizable-container">
                <input
                    data-testid="resizable-input"
                    onBlur={(event) => {
                        props.onBlur(event.target.value);
                    }}
                />
            </div>
        );
    },
}));

type SutParams = {
    id?: string;
    description?: string;
    shouldHover?: boolean;
    listToDosUseCaseResponse?: ToDo[];
};

type SutTypes = {
    id: string;
    description: string;
    toDoContainer: HTMLElement;
    updateToDoUseCaseSpy: UpdateToDoUseCaseSpy;
    deleteToDoUseCaseSpy: DeleteToDoUseCaseSpy;
};

const makeSut = async ({
    id = "any_id",
    description = "any description",
    shouldHover = true,
    listToDosUseCaseResponse: response,
}: SutParams = {}): Promise<SutTypes> => {
    const listToDosUseCaseSpy = new ListToDosUseCaseSpy();
    const createToDoUseCaseSpy = new CreateToDoUseCaseSpy();
    const updateToDoUseCaseSpy = new UpdateToDoUseCaseSpy();
    const deleteToDoUseCaseSpy = new DeleteToDoUseCaseSpy();
    if (response != null) listToDosUseCaseSpy.response = response;

    await act(async () => {
        render(
            <ToDoProvider
                listToDosUseCase={listToDosUseCaseSpy}
                createToDoUseCase={createToDoUseCaseSpy}
                updateToDoUseCase={updateToDoUseCaseSpy}
                deleteToDoUseCase={deleteToDoUseCaseSpy}
            >
                <ToDoItem id={id} description={description} isDone={false} />
            </ToDoProvider>
        );
    });

    const toDoContainer = screen.getByTestId("to-do-item-container");
    if (shouldHover) {
        fireEvent.mouseEnter(toDoContainer);
    }

    return {
        id,
        description,
        toDoContainer,
        updateToDoUseCaseSpy,
        deleteToDoUseCaseSpy,
    };
};

describe("ToDoItem", () => {
    test("should display correct initial values", async () => {
        const { description } = await makeSut();
        const status = screen.getByTestId(
            "status-checkbox"
        ) as HTMLInputElement;
        const resizableInputText = screen.getByTestId("resizable-container");
        const deleteButton = screen.getByTestId("delete-button");

        expect(status.checked).toBe(false);
        expect(resizableInputText).toBeInTheDocument();
        expect(resizableInputTextMock).toHaveBeenCalledWith({
            placeholder: "new to-do",
            value: description,
            onBlur: expect.any(Function),
        });
        expect(deleteButton).toBeInTheDocument();
    });

    test("should call DeleteToDoUseCase on delete button click", async () => {
        const { deleteToDoUseCaseSpy } = await makeSut();
        const deleteButton = screen.getByTestId("delete-button");

        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteToDoUseCaseSpy.callsCount).toBe(1);
        });
    });

    test("should call UpdateToDoUseCase on checkbox click", async () => {
        const { updateToDoUseCaseSpy } = await makeSut();
        const status = screen.getByTestId(
            "status-checkbox"
        ) as HTMLInputElement;

        fireEvent.click(status);
        expect(status.checked).toBe(true);

        await waitFor(() => {
            expect(updateToDoUseCaseSpy.callsCount).toBe(1);
        });
    });

    test("should call UpdateToDoUseCase on handleToDoDescriptionChange if description is different", async () => {
        const { updateToDoUseCaseSpy } = await makeSut();

        const input = screen.getByTestId("resizable-input") as HTMLInputElement;
        await waitFor(() => {
            fireEvent.change(input, {
                target: { value: "new description" },
            });
            fireEvent.blur(input);
        });

        expect(updateToDoUseCaseSpy.callsCount).toBe(1);
    });

    test("should not call UpdateToDoUseCase on handleToDoDescriptionChange if description is the same", async () => {
        const { updateToDoUseCaseSpy } = await makeSut();

        const input = screen.getByTestId("resizable-input") as HTMLInputElement;
        await waitFor(() => {
            fireEvent.blur(input);
        });

        expect(updateToDoUseCaseSpy.callsCount).toBe(0);
    });

    test("should pass correct style when status is checked", async () => {
        const { description } = await makeSut();
        const status = screen.getByTestId(
            "status-checkbox"
        ) as HTMLInputElement;
        fireEvent.click(status);

        expect(resizableInputTextMock).toHaveBeenCalledWith({
            placeholder: "new to-do",
            value: description,
            onBlur: expect.any(Function),
            style: {
                textDecoration: "line-through",
                opacity: 0.5,
            },
        });
    });

    test("should not display delete button and status checkbox", async () => {
        await makeSut({ shouldHover: false });
        const deleteButton = screen.queryByTestId("delete-button");
        const status = screen.queryByTestId("status-checkbox");

        expect(deleteButton).toBeNull();
        expect(status).toBeNull();
    });

    test("should display delete button and status checkbox on hover", async () => {
        const { toDoContainer } = await makeSut();

        fireEvent.mouseEnter(toDoContainer);
        const deleteButton = screen.getByTestId("delete-button");
        const status = screen.getByTestId(
            "status-checkbox"
        ) as HTMLInputElement;

        expect(deleteButton).toBeVisible();
        expect(status).toBeVisible();
    });

    test("should not display delete button and status checkbox on mouse leave", async () => {
        const { toDoContainer } = await makeSut();

        fireEvent.mouseLeave(toDoContainer);
        const deleteButton = screen.queryByTestId("delete-button");
        const status = screen.queryByTestId("status-checkbox");

        expect(deleteButton).toBeNull();
        expect(status).toBeNull();
    });
});

import { useEffect, useState } from "react";
import { type ToDo } from "../../@core/domain/entities";
import { ToDoContext } from "./to-do.context";
import {
    type CreateToDoUseCase,
    type DeleteToDoUseCase,
    type ListToDosUseCase,
    type UpdateToDoUseCase,
} from "../../@core/domain/usecases";

type ToDoProviderProps = {
    children: React.ReactNode;
    listToDosUseCase: ListToDosUseCase;
    createToDoUseCase: CreateToDoUseCase;
    updateToDoUseCase: UpdateToDoUseCase;
    deleteToDoUseCase: DeleteToDoUseCase;
};

export const ToDoProvider: React.FC<ToDoProviderProps> = ({
    children,
    listToDosUseCase,
    createToDoUseCase,
    updateToDoUseCase,
    deleteToDoUseCase,
}) => {
    const [toDos, setToDos] = useState<ToDo[]>([]);

    const refreshToDos = async (): Promise<void> => {
        const response = await listToDosUseCase.listToDos();
        setToDos(response);
    };

    useEffect(() => {
        refreshToDos()
            .then()
            .catch((error): void => {
                console.error(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddToDo = async (): Promise<void> => {
        await createToDoUseCase.createToDo({ description: "" });
        await refreshToDos();
    };

    const handleToDoDescriptionChange = async (
        id: string,
        description: string
    ): Promise<void> => {
        await updateToDoUseCase.updateToDo({
            id,
            description,
        });
        await refreshToDos();
    };

    const handleToDoStatusChange = async (
        id: string,
        isDone: boolean
    ): Promise<void> => {
        await updateToDoUseCase.updateToDo({
            id,
            isDone,
        });
        await refreshToDos();
    };

    const handleDeleteToDo = async (id: string): Promise<void> => {
        await deleteToDoUseCase.delete(id);
        await refreshToDos();
    };

    return (
        <ToDoContext.Provider
            value={{
                toDos,
                refreshToDos,
                handleAddToDo,
                handleToDoDescriptionChange,
                handleToDoStatusChange,
                handleDeleteToDo,
            }}
        >
            {children}
        </ToDoContext.Provider>
    );
};

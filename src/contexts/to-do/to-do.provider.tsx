import { useCallback, useEffect, useState } from "react";
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

    const refreshToDos = useCallback(async (): Promise<void> => {
        const response = await listToDosUseCase.listToDos();
        setToDos(response);
    }, [listToDosUseCase]);

    useEffect(() => {
        refreshToDos()
            .then()
            .catch((error): void => {
                console.error(error);
            });
    }, [refreshToDos]);

    const addToDo = async (): Promise<void> => {
        await createToDoUseCase.createToDo({ description: "" });
        await refreshToDos();
    };

    const updateToDoDescription = async (
        id: string,
        description: string
    ): Promise<void> => {
        const existingToDo = toDos.find((toDo) => toDo.id === id);
        if (existingToDo?.description !== description) {
            await updateToDoUseCase.updateToDo({
                id,
                description,
            });
            await refreshToDos();
        }
    };

    const updateToDoStatus = async (
        id: string,
        isDone: boolean
    ): Promise<void> => {
        await updateToDoUseCase.updateToDo({
            id,
            isDone,
        });
        await refreshToDos();
    };

    const deleteToDo = async (id: string): Promise<void> => {
        await deleteToDoUseCase.delete(id);
        await refreshToDos();
    };

    return (
        <ToDoContext.Provider
            value={{
                toDos,
                refreshToDos,
                addToDo,
                updateToDoDescription,
                updateToDoStatus,
                deleteToDo,
            }}
        >
            {children}
        </ToDoContext.Provider>
    );
};

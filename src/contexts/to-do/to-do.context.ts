import { createContext } from "react";
import { type ToDo } from "../../@core/domain/entities";

export type ToDoContextType = {
    toDos: ToDo[];
    refreshToDos: () => Promise<void>;
    handleAddToDo: () => Promise<void>;
    handleToDoDescriptionChange: (
        id: string,
        description: string
    ) => Promise<void>;
    handleToDoStatusChange: (id: string, isDone: boolean) => Promise<void>;
    handleDeleteToDo: (id: string) => Promise<void>;
};

export const ToDoContext = createContext<ToDoContextType>({
    toDos: [],
    refreshToDos: async () => {},
    handleAddToDo: async () => {},
    handleToDoDescriptionChange: async () => {},
    handleToDoStatusChange: async () => {},
    handleDeleteToDo: async () => {},
});

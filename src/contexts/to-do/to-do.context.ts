import { createContext } from "react";
import { type ToDo } from "../../@core/domain/entities";

export type ToDoContextType = {
    toDos: ToDo[];
    refreshToDos: () => Promise<void>;
    addToDo: () => Promise<void>;
    updateToDoDescription: (id: string, description: string) => Promise<void>;
    updateToDoStatus: (id: string, isDone: boolean) => Promise<void>;
    deleteToDo: (id: string) => Promise<void>;
};

// istanbul ignore next
export const ToDoContext = createContext<ToDoContextType>({
    toDos: [],
    refreshToDos: async () => {},
    addToDo: async () => {},
    updateToDoDescription: async () => {},
    updateToDoStatus: async () => {},
    deleteToDo: async () => {},
});

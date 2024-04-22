import { useContext } from "react";
import { ToDoContext, type ToDoContextType } from "./to-do.context";

export const useToDoContext = (): ToDoContextType => {
    return useContext(ToDoContext);
};

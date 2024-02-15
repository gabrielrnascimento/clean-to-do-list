import { type ToDo } from "../entities";

export interface ToDoGateway {
    getToDos: () => Promise<ToDo[]>;
}

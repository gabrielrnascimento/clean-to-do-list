import { type ToDo } from "../entities";

export interface ListToDosUseCase {
    listToDos: () => Promise<ToDo[]>;
}

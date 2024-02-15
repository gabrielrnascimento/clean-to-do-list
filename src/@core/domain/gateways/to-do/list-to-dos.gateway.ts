import { type ToDo } from "../../entities";

export interface ListToDosGateway {
    getToDos: () => Promise<ToDo[]>;
}

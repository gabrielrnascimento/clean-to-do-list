import { type ToDo } from "../../entities";

export interface ListToDosGateway {
    getAll: () => Promise<ToDo[]>;
}

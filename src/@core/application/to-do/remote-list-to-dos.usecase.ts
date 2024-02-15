import { type ToDo } from "../../domain/entities";
import { type ToDoGateway } from "../../domain/gateways";

export class RemoteListToDosUseCase {
    constructor(private readonly toDoGateway: ToDoGateway) {}

    async listToDos(): Promise<ToDo[]> {
        return await this.toDoGateway.getToDos();
    }
}

import { type ToDo } from "../../domain/entities";
import { type ToDoGateway } from "../../domain/gateways";

export class RemoteListToDosUseCase {
    constructor(private readonly toDoGateway: ToDoGateway) {}

    async listToDos(): Promise<ToDo[]> {
        await this.toDoGateway.getToDos();

        return [];
    }
}

import { type ToDo } from "../../domain/entities";
import { type ListToDosGateway } from "../../domain/gateways/to-do";

export class RemoteListToDosUseCase {
    constructor(private readonly listToDosGateway: ListToDosGateway) {}

    async listToDos(): Promise<ToDo[]> {
        return await this.listToDosGateway.getAll();
    }
}

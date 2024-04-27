import { type ToDo } from "../../domain/entities";
import { type ListToDosGateway } from "../../domain/gateways/to-do";
import { type ListToDosUseCase } from "../../domain/usecases";

export class RemoteListToDosUseCase implements ListToDosUseCase {
    constructor(private readonly listToDosGateway: ListToDosGateway) {}

    async listToDos(): Promise<ToDo[]> {
        return await this.listToDosGateway.getAll();
    }
}

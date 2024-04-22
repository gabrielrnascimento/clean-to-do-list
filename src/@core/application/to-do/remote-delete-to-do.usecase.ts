import { type DeleteToDoGateway } from "../../domain/gateways/to-do";
import { type DeleteToDoUseCase } from "../../domain/usecases";

export class RemoteDeleteToDoUseCase implements DeleteToDoUseCase {
    constructor(private readonly deleteToDoGateway: DeleteToDoGateway) {}

    async delete(id: string): Promise<void> {
        await this.deleteToDoGateway.delete(id);
    }
}

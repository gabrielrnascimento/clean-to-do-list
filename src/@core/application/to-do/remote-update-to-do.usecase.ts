import { type UpdateToDoGateway } from "../../domain/gateways/to-do";
import {
    type UpdateToDoUseCase,
    type UpdateToDoUseCaseParams,
} from "../../domain/usecases";

export class RemoteUpdateToDoUseCase implements UpdateToDoUseCase {
    constructor(private readonly updateToDoGateway: UpdateToDoGateway) {}

    async updateToDo(params: UpdateToDoUseCaseParams): Promise<void> {
        await this.updateToDoGateway.update(params);
    }
}

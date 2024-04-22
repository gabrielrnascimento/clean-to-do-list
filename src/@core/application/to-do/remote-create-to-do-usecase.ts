import { type CreateToDoGateway } from "../../domain/gateways/to-do";
import {
    type CreateToDoUseCaseParams,
    type CreateToDoUseCase,
} from "../../domain/usecases";

export class RemoteCreateToDoUseCase implements CreateToDoUseCase {
    constructor(private readonly createToDoGateway: CreateToDoGateway) {}

    async createToDo(params: CreateToDoUseCaseParams): Promise<void> {
        await this.createToDoGateway.create(params);
    }
}

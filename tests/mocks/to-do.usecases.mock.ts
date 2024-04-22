import { type ToDo } from "../../src/@core/domain/entities";
import {
    type ListToDosUseCase,
    type CreateToDoUseCase,
    type CreateToDoUseCaseParams,
    type UpdateToDoUseCase,
    type UpdateToDoUseCaseParams,
    type DeleteToDoUseCase,
} from "../../src/@core/domain/usecases";
import { makeMockToDos } from "./utils";

export class ListToDosUseCaseSpy implements ListToDosUseCase {
    response = makeMockToDos();
    callsCount = 0;

    async listToDos(): Promise<ToDo[]> {
        this.callsCount++;
        return this.response;
    }
}

export class CreateToDoUseCaseSpy implements CreateToDoUseCase {
    callsCount = 0;

    async createToDo(params: CreateToDoUseCaseParams): Promise<void> {
        this.callsCount++;
    }
}

export class UpdateToDoUseCaseSpy implements UpdateToDoUseCase {
    callsCount = 0;
    params!: UpdateToDoUseCaseParams;

    async updateToDo(params: UpdateToDoUseCaseParams): Promise<void> {
        this.callsCount++;
        this.params = params;
    }
}

export class DeleteToDoUseCaseSpy implements DeleteToDoUseCase {
    callsCount = 0;
    params!: string;

    async delete(id: string): Promise<void> {
        this.callsCount++;
        this.params = id;
    }
}

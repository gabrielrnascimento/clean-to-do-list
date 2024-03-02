import { type ToDo } from "../entities";

export type CreateToDoUseCaseParams = Pick<ToDo, "description">;

export interface CreateToDoUseCase {
    createToDo: (params: CreateToDoUseCaseParams) => Promise<void>;
}

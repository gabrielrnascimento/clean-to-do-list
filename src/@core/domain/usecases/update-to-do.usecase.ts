import { type ToDo } from "../entities";

export type UpdateToDoUseCaseParams = Pick<
    ToDo,
    "id" | "description" | "isDone"
>;

export interface UpdateToDoUseCase {
    updateToDo: (params: UpdateToDoUseCaseParams) => Promise<void>;
}

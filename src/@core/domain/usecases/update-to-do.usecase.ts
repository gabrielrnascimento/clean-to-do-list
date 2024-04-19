import { type ToDo } from "../entities";

export type UpdateToDoUseCaseParams = Pick<ToDo, "id"> & Partial<ToDo>;

export interface UpdateToDoUseCase {
    updateToDo: (params: UpdateToDoUseCaseParams) => Promise<void>;
}

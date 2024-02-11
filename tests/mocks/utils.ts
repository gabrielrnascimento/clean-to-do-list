import { ToDo } from "../../src/@core/domain/entities";

export const makeMockToDos = (): ToDo[] => {
    return [
        new ToDo({
            id: "1",
            description: "any_description",
            isDone: false,
        }),
        new ToDo({
            id: "2",
            description: "another_description",
            isDone: true,
        }),
    ];
};

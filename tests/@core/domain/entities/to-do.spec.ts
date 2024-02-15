import { ToDo } from "../../../../src/@core/domain/entities";

describe("ToDo", () => {
    test("should create a new to do instance with correct properties", () => {
        const toDoProps = {
            id: "1",
            description: "Any to-do description",
            isDone: false,
        };
        const toDo = new ToDo(toDoProps);

        expect(toDo.id).toBe(toDoProps.id);
        expect(toDo.description).toBe(toDoProps.description);
        expect(toDo.isDone).toBe(toDoProps.isDone);
    });
});

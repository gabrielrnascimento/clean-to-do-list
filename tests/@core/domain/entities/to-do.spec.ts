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

    test("should update to do properties correctly", () => {
        const toDoProps = {
            id: "1",
            description: "Any to-do description",
            isDone: false,
        };

        const toDo = new ToDo(toDoProps);
        toDo.id = "2";
        toDo.description = "Another to-do description";
        toDo.isDone = true;

        expect(toDo.id).toBe("2");
        expect(toDo.description).toBe("Another to-do description");
        expect(toDo.isDone).toBe(true);
    });

    test("should return empty string when id is not provided", () => {
        const toDoProps = {
            description: "Any to-do description",
            isDone: false,
        };

        const toDo = new ToDo(toDoProps);

        expect(toDo.id).toBe("");
    });
});

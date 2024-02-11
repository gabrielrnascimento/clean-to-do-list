import { RemoteListToDosUseCase } from "../../../../src/@core/application/to-do";
import { ToDo } from "../../../../src/@core/domain/entities";
import { type ToDoGateway } from "../../../../src/@core/domain/gateways";

const makeMockToDos = (): ToDo[] => {
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

class ToDoGatewayStub implements ToDoGateway {
    async getToDos(): Promise<ToDo[]> {
        return makeMockToDos();
    }
}

type SutTypes = {
    sut: RemoteListToDosUseCase;
    toDoGatewayStub: ToDoGatewayStub;
};

const makeSut = (): SutTypes => {
    const toDoGatewayStub = new ToDoGatewayStub();
    const sut = new RemoteListToDosUseCase(toDoGatewayStub);
    return {
        sut,
        toDoGatewayStub,
    };
};

describe("RemoteListToDosUseCase", () => {
    test("should call ToDoGateway.getToDos", async () => {
        const { sut, toDoGatewayStub } = makeSut();
        const getTodosSpy = jest.spyOn(toDoGatewayStub, "getToDos");

        await sut.listToDos();

        expect(getTodosSpy).toHaveBeenCalled();
    });

    test("should return values from ToDoGateway.getToDos", async () => {
        const { sut } = makeSut();

        const toDos = await sut.listToDos();

        expect(toDos).toEqual(makeMockToDos());
    });
});

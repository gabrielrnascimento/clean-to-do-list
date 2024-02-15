import { RemoteListToDosUseCase } from "../../../../src/@core/application/to-do";
import { type ToDo } from "../../../../src/@core/domain/entities";
import { type ToDoGateway } from "../../../../src/@core/domain/gateways";
import { makeMockToDos } from "../../../mocks";

class ToDoGatewaySpy implements ToDoGateway {
    response: ToDo[] = makeMockToDos();

    async getToDos(): Promise<ToDo[]> {
        return this.response;
    }
}

type SutTypes = {
    sut: RemoteListToDosUseCase;
    toDoGatewaySpy: ToDoGatewaySpy;
};

const makeSut = (): SutTypes => {
    const toDoGatewaySpy = new ToDoGatewaySpy();
    const sut = new RemoteListToDosUseCase(toDoGatewaySpy);
    return {
        sut,
        toDoGatewaySpy,
    };
};

describe("RemoteListToDosUseCase", () => {
    test("should call ToDoGateway.getToDos", async () => {
        const { sut, toDoGatewaySpy } = makeSut();
        const getTodosSpy = jest.spyOn(toDoGatewaySpy, "getToDos");

        await sut.listToDos();

        expect(getTodosSpy).toHaveBeenCalled();
    });

    test("should return values from ToDoGateway.getToDos", async () => {
        const { sut, toDoGatewaySpy } = makeSut();

        const toDos = await sut.listToDos();

        expect(toDos).toEqual(toDoGatewaySpy.response);
    });
});

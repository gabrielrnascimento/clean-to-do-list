import { RemoteListToDosUseCase } from "../../../../src/@core/application/to-do";
import { type ToDo } from "../../../../src/@core/domain/entities";
import { type ToDoGateway } from "../../../../src/@core/domain/gateways";

class ToDoGatewayStub implements ToDoGateway {
    async getToDos(): Promise<ToDo[]> {
        return [];
    }
}

describe("RemoteListToDosUseCase", () => {
    test("should call ToDoGateway.getToDos", async () => {
        const toDoGatewayStub = new ToDoGatewayStub();
        const sut = new RemoteListToDosUseCase(toDoGatewayStub);
        const getTodosSpy = jest.spyOn(toDoGatewayStub, "getToDos");

        await sut.listToDos();

        expect(getTodosSpy).toHaveBeenCalled();
    });
});

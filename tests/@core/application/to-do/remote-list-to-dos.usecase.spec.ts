import { RemoteListToDosUseCase } from "../../../../src/@core/application/to-do";
import { type ToDo } from "../../../../src/@core/domain/entities";
import { type ListToDosGateway } from "../../../../src/@core/domain/gateways/to-do";
import { makeMockToDos } from "../../../mocks";

class ListToDosGatewaySpy implements ListToDosGateway {
    response: ToDo[] = makeMockToDos();

    async getToDos(): Promise<ToDo[]> {
        return this.response;
    }
}

type SutTypes = {
    sut: RemoteListToDosUseCase;
    listToDosGatewaySpy: ListToDosGatewaySpy;
};

const makeSut = (): SutTypes => {
    const listToDosGatewaySpy = new ListToDosGatewaySpy();
    const sut = new RemoteListToDosUseCase(listToDosGatewaySpy);
    return {
        sut,
        listToDosGatewaySpy,
    };
};

describe("RemoteListToDosUseCase", () => {
    test("should call ListToDosGateway.getToDos", async () => {
        const { sut, listToDosGatewaySpy } = makeSut();
        const getTodosSpy = jest.spyOn(listToDosGatewaySpy, "getToDos");

        await sut.listToDos();

        expect(getTodosSpy).toHaveBeenCalled();
    });

    test("should return values from ListToDosGateway.getToDos", async () => {
        const { sut, listToDosGatewaySpy } = makeSut();

        const toDos = await sut.listToDos();

        expect(toDos).toEqual(listToDosGatewaySpy.response);
    });
});

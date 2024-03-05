import { RemoteDeleteToDoUseCase } from "../../../../src/@core/application/to-do";
import { type DeleteToDoGateway } from "../../../../src/@core/domain/gateways/to-do";

class DeleteToDoGatewaySpy implements DeleteToDoGateway {
    params!: string;

    async delete(id: string): Promise<void> {
        this.params = id;
        await Promise.resolve();
    }
}

type SutTypes = {
    sut: RemoteDeleteToDoUseCase;
    deleteToDoGatewaySpy: DeleteToDoGatewaySpy;
};

const makeSut = (): SutTypes => {
    const deleteToDoGatewaySpy = new DeleteToDoGatewaySpy();
    const sut = new RemoteDeleteToDoUseCase(deleteToDoGatewaySpy);
    return {
        sut,
        deleteToDoGatewaySpy,
    };
};

describe("RemoteDeleteToDoUseCase", () => {
    test("should call DeleteToDoGateway with correct value", async () => {
        const { sut, deleteToDoGatewaySpy } = makeSut();
        const id = "any_id";

        await sut.delete(id);

        expect(deleteToDoGatewaySpy.params).toEqual(id);
    });
});

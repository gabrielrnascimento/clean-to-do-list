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

    test("should throw if DeleteToDoGateway throws", async () => {
        const { sut, deleteToDoGatewaySpy } = makeSut();
        jest.spyOn(deleteToDoGatewaySpy, "delete").mockRejectedValueOnce(
            new Error("any_error")
        );
        const promise = sut.delete("any_id");

        await expect(promise).rejects.toThrow(new Error("any_error"));
    });
});

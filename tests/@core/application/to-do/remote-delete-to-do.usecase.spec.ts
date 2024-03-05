import { RemoteDeleteToDoUseCase } from "../../../../src/@core/application/to-do";
import { type DeleteToDoGateway } from "../../../../src/@core/domain/gateways/to-do";

class DeleteToDoGatewaySpy implements DeleteToDoGateway {
    params!: string;

    async delete(id: string): Promise<void> {
        this.params = id;
        await Promise.resolve();
    }
}

describe("RemoteDeleteToDoUseCase", () => {
    test("should call DeleteToDoGateway with correct value", async () => {
        const deleteToDoGatewaySpy = new DeleteToDoGatewaySpy();
        const sut = new RemoteDeleteToDoUseCase(deleteToDoGatewaySpy);
        const id = "any_id";

        await sut.delete(id);

        expect(deleteToDoGatewaySpy.params).toEqual(id);
    });
});

import { RemoteUpdateToDoUseCase } from "../../../../src/@core/application/to-do";
import {
    type UpdateToDoGatewayParams,
    type UpdateToDoGateway,
} from "../../../../src/@core/domain/gateways/to-do";
import { type UpdateToDoUseCaseParams } from "../../../../src/@core/domain/usecases";

class UpdateToDoGatewaySpy implements UpdateToDoGateway {
    params!: UpdateToDoGatewayParams;

    async update(params: UpdateToDoGatewayParams): Promise<void> {
        this.params = params;
        await Promise.resolve();
    }
}

describe("RemoteUpdateToDoUseCase", () => {
    test("should call UpdateToDoGateway with correct values", async () => {
        const updateToDoGatewaySpy = new UpdateToDoGatewaySpy();
        const sut = new RemoteUpdateToDoUseCase(updateToDoGatewaySpy);
        const params: UpdateToDoUseCaseParams = {
            id: "any_id",
            description: "any_description",
            isDone: true,
        };

        await sut.updateToDo(params);

        expect(updateToDoGatewaySpy.params).toEqual(params);
    });
});

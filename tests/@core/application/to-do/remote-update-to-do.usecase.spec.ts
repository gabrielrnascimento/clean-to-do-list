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

type SutTypes = {
    sut: RemoteUpdateToDoUseCase;
    updateToDoGatewaySpy: UpdateToDoGatewaySpy;
};

const makeSut = (): SutTypes => {
    const updateToDoGatewaySpy = new UpdateToDoGatewaySpy();
    const sut = new RemoteUpdateToDoUseCase(updateToDoGatewaySpy);
    return {
        sut,
        updateToDoGatewaySpy,
    };
};

describe("RemoteUpdateToDoUseCase", () => {
    test("should call UpdateToDoGateway with correct values", async () => {
        const { sut, updateToDoGatewaySpy } = makeSut();
        const params: UpdateToDoUseCaseParams = {
            id: "any_id",
            description: "any_description",
            isDone: true,
        };

        await sut.updateToDo(params);

        expect(updateToDoGatewaySpy.params).toEqual(params);
    });

    test("should throw if UpdateToDoGateway throws", async () => {
        const { sut, updateToDoGatewaySpy } = makeSut();
        const params: UpdateToDoUseCaseParams = {
            id: "any_id",
            description: "any_description",
            isDone: true,
        };
        const error = new Error("any_error");
        jest.spyOn(updateToDoGatewaySpy, "update").mockRejectedValueOnce(error);

        const promise = sut.updateToDo(params);

        await expect(promise).rejects.toThrow(error);
    });
});

import { RemoteCreateToDoUseCase } from "../../../../src/@core/application/to-do/remote-create-to-do-usecase";
import {
    type CreateToDoGateway,
    type CreateToDoGatewayParams,
} from "../../../../src/@core/domain/gateways/to-do";
import { type CreateToDoUseCaseParams } from "../../../../src/@core/domain/usecases";

class CreateToDoGatewaySpy implements CreateToDoGateway {
    public params!: CreateToDoGatewayParams;

    async create(params: CreateToDoGatewayParams): Promise<void> {
        this.params = params;
    }
}

type SutTypes = {
    sut: RemoteCreateToDoUseCase;
    createToDoGatewaySpy: CreateToDoGatewaySpy;
};

const makeSut = (): SutTypes => {
    const createToDoGatewaySpy = new CreateToDoGatewaySpy();
    const sut = new RemoteCreateToDoUseCase(createToDoGatewaySpy);
    return {
        sut,
        createToDoGatewaySpy,
    };
};

describe("RemoteCreateToDoUseCase", () => {
    test("should call CreateToDoGateway with correct values", async () => {
        const { sut, createToDoGatewaySpy } = makeSut();
        const params: CreateToDoUseCaseParams = {
            description: "any_description",
        };

        await sut.createToDo(params);

        expect(createToDoGatewaySpy.params).toEqual({
            description: params.description,
        });
    });

    test("should throw if CreateToDoGateway throws", async () => {
        const { sut, createToDoGatewaySpy } = makeSut();
        jest.spyOn(createToDoGatewaySpy, "create").mockRejectedValueOnce(
            new Error("any_error")
        );

        const promise = sut.createToDo({
            description: "any_description",
        });

        await expect(promise).rejects.toThrow(new Error("any_error"));
    });
});

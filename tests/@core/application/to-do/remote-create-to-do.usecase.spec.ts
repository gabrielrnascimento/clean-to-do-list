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
        const toDo: CreateToDoUseCaseParams = {
            description: "any_description",
        };

        await sut.createToDo(toDo);

        expect(createToDoGatewaySpy.params).toEqual({
            description: toDo.description,
        });
    });
});

import {
    HttpMethod,
    type HttpClient,
    type HttpRequestParams,
    type HttpResponse,
} from "../../../../src/@core/application/http";
import { type ToDo } from "../../../../src/@core/domain/entities";
import { ToDoHttpGateway } from "../../../../src/@core/infra/gateways/to-do-http.gateway";

class HttpClientStub implements HttpClient {
    async request(
        requestParams: HttpRequestParams
    ): Promise<HttpResponse<ToDo[]>> {
        return {
            statusCode: 200,
        };
    }
}

type SutTypes = {
    sut: ToDoHttpGateway;
    httpClientStub: HttpClientStub;
};

const makeSut = (): SutTypes => {
    const httpClientStub = new HttpClientStub();
    const sut = new ToDoHttpGateway("any_url", httpClientStub);
    return {
        sut,
        httpClientStub,
    };
};

describe("ToDoHttpGateway", () => {
    test("should call HttpClient.request with correct values", async () => {
        const { sut, httpClientStub } = makeSut();
        const url = "any_url";
        const requestSpy = jest.spyOn(httpClientStub, "request");

        await sut.getToDos();

        expect(requestSpy).toHaveBeenCalledWith({
            method: HttpMethod.GET,
            url,
        });
    });
});

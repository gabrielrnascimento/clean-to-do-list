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

describe("ToDoHttpGateway", () => {
    test("should call HttpClient.request with correct values", async () => {
        const httpClientStub = new HttpClientStub();
        const url = "any_url";
        const sut = new ToDoHttpGateway(url, httpClientStub);
        const requestSpy = jest.spyOn(httpClientStub, "request");

        await sut.getToDos();

        expect(requestSpy).toHaveBeenCalledWith({
            method: HttpMethod.GET,
            url,
        });
    });
});

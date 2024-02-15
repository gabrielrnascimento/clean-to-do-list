import axios from "axios";
import {
    type HttpRequestParams,
    type HttpResponse,
    type HttpClient,
} from "../../application/http";
import { type ToDo } from "../../domain/entities";

export class AxiosHttpClient implements HttpClient {
    async request(
        requestParams: HttpRequestParams
    ): Promise<HttpResponse<ToDo[]>> {
        const response = await axios.request({
            url: requestParams.url,
            method: requestParams.method,
        });

        return {
            statusCode: response.status,
            body: response.data,
        };
    }
}

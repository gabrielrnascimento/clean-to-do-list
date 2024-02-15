import { HttpMethod, type HttpClient } from "../../application/http";
import { type ToDo } from "../../domain/entities";

export class ToDoHttpGateway {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<ToDo[]>
    ) {}

    async getToDos(): Promise<ToDo[]> {
        const response = await this.httpClient.request({
            method: HttpMethod.GET,
            url: this.url,
        });

        return response.body ?? [];
    }
}

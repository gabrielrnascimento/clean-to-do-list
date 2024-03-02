import { HttpMethod, type HttpClient } from "../../application/http";
import { type ToDo } from "../../domain/entities";
import { type ListToDosGateway } from "../../domain/gateways/to-do";

export class ToDoHttpGateway implements ListToDosGateway {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<ToDo[]>
    ) {}

    async getAll(): Promise<ToDo[]> {
        const response = await this.httpClient.request({
            method: HttpMethod.GET,
            url: this.url,
        });

        return response.body ?? [];
    }
}

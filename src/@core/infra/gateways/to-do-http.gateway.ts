import { HttpMethod, type HttpClient } from "../../application/http";
import { type ToDo } from "../../domain/entities";
import {
    type CreateToDoGatewayParams,
    type CreateToDoGateway,
    type ListToDosGateway,
    type DeleteToDoGateway,
    type UpdateToDoGateway,
    type UpdateToDoGatewayParams,
} from "../../domain/gateways/to-do";

export class ToDoHttpGateway
    implements
        ListToDosGateway,
        CreateToDoGateway,
        DeleteToDoGateway,
        UpdateToDoGateway
{
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<Partial<ToDo>, ToDo[]>
    ) {}

    async getAll(): Promise<ToDo[]> {
        const response = await this.httpClient.request({
            method: HttpMethod.GET,
            url: this.url,
        });

        return response.body ?? [];
    }

    async create(params: CreateToDoGatewayParams): Promise<void> {
        await this.httpClient.request({
            method: HttpMethod.POST,
            url: this.url,
            body: {
                description: params.description,
                isDone: false,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.httpClient.request({
            method: HttpMethod.DELETE,
            url: `${this.url}/${id}`,
        });
    }

    async update(params: UpdateToDoGatewayParams): Promise<void> {
        await this.httpClient.request({
            method: HttpMethod.PATCH,
            url: `${this.url}/${params.id}`,
            body: {
                description: params.description,
                isDone: params.isDone,
            },
        });
    }
}

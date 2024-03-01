import { type ToDo } from "../../entities";

export type CreateToDoGatewayParams = Pick<ToDo, "description">;

export interface CreateToDoGateway {
    create: (params: CreateToDoGatewayParams) => Promise<void>;
}

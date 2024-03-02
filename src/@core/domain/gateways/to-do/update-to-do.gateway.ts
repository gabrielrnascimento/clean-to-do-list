import { type ToDo } from "../../entities";

export type UpdateToDoGatewayParams = Pick<
    ToDo,
    "id" | "description" | "isDone"
>;

export interface UpdateToDoGateway {
    update: (params: UpdateToDoGatewayParams) => Promise<void>;
}

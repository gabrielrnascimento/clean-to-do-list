import { type ToDo } from "../../entities";

export type UpdateToDoGatewayParams = Pick<ToDo, "id"> & Partial<ToDo>;

export interface UpdateToDoGateway {
    update: (params: UpdateToDoGatewayParams) => Promise<void>;
}

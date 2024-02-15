import { createContainer, asClass, asValue } from "awilix";
import { AxiosHttpClient } from "../http/axios-http-client";
import { RemoteListToDosUseCase } from "../../application/to-do";
import { ToDoHttpGateway } from "../gateways/to-do-http.gateway";
import { env } from "../config";

export const container = createContainer({
    injectionMode: "CLASSIC",
    strict: true,
});

container.register({
    httpClient: asClass(AxiosHttpClient),
    toDoGateway: asClass(ToDoHttpGateway),
    url: asValue(env.apiUrl),
    remoteListToDosUseCase: asClass(RemoteListToDosUseCase),
});

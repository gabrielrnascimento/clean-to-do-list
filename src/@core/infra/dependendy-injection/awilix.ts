// istanbul ignore file
import { createContainer, asClass, asValue } from "awilix";
import { AxiosHttpClient } from "../http/axios-http-client";
import {
    RemoteCreateToDoUseCase,
    RemoteDeleteToDoUseCase,
    RemoteListToDosUseCase,
    RemoteUpdateToDoUseCase,
} from "../../application/to-do";
import { ToDoHttpGateway } from "../gateways/to-do-http.gateway";
import { env } from "../config";

export const container = createContainer({
    injectionMode: "CLASSIC",
    strict: true,
});

container.register({
    httpClient: asClass(AxiosHttpClient),
    url: asValue(env.apiUrl),

    listToDosGateway: asClass(ToDoHttpGateway),
    createToDoGateway: asClass(ToDoHttpGateway),
    updateToDoGateway: asClass(ToDoHttpGateway),
    deleteToDoGateway: asClass(ToDoHttpGateway),

    remoteListToDosUseCase: asClass(RemoteListToDosUseCase),
    remoteCreateToDoUseCase: asClass(RemoteCreateToDoUseCase),
    remoteUpdateToDoUseCase: asClass(RemoteUpdateToDoUseCase),
    remoteDeleteToDoUseCase: asClass(RemoteDeleteToDoUseCase),
});

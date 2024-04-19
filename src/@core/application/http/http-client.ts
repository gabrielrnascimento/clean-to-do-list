export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export type HttpRequestParams<T = unknown> = {
    url: string;
    method: HttpMethod;
    body?: T;
};

export type HttpResponse<T = unknown> = {
    statusCode: number;
    body?: T;
};

export interface HttpClient<T = unknown, R = unknown> {
    request: (requestParams: HttpRequestParams<T>) => Promise<HttpResponse<R>>;
}

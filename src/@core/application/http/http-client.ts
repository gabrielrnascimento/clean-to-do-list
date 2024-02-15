export enum HttpMethod {
    GET = "GET",
}

export type HttpRequestParams = {
    url: string;
    method: HttpMethod.GET;
};

export type HttpResponse<T = unknown> = {
    statusCode: number;
    body?: T;
};

export interface HttpClient<R = unknown> {
    request: (requestParams: HttpRequestParams) => Promise<HttpResponse<R>>;
}

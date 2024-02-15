/* eslint-disable import/first */

const mockAxiosResponse = {
    status: 200,
    data: "any_value",
};

const axiosMock = jest.fn();
jest.mock("axios", () => ({
    request: axiosMock.mockImplementation(
        async () => await Promise.resolve(mockAxiosResponse)
    ),
}));

import { HttpMethod } from "../../../../src/@core/application/http";
import { AxiosHttpClient } from "../../../../src/@core/infra/http/axios-http-client";

type SutTypes = {
    sut: AxiosHttpClient;
};

const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient();
    return {
        sut,
    };
};

describe("AxiosHttpClient", () => {
    test("should call axios.request with correct values", async () => {
        const { sut } = makeSut();

        await sut.request({
            url: "any_url",
            method: HttpMethod.GET,
        });

        expect(axiosMock).toHaveBeenCalledWith({
            url: "any_url",
            method: HttpMethod.GET,
        });
    });

    test("should return correct axios response", async () => {
        const { sut } = makeSut();

        const response = await sut.request({
            url: "any_url",
            method: HttpMethod.GET,
        });

        expect(response).toEqual({
            statusCode: mockAxiosResponse.status,
            body: mockAxiosResponse.data,
        });
    });
});

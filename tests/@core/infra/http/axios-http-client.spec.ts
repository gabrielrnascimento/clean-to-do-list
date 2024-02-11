/* eslint-disable import/first */
const axiosMock = jest.fn();
jest.mock("axios", () => ({
    request: axiosMock,
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
});

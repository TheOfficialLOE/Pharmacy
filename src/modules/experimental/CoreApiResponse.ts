import { Code } from "#modules/experimental/Code";

export class CoreApiResponse<Data> {
    public readonly code: number;
    public readonly message: string;
    public readonly data: Data | null;

    private constructor(code: number, message: string, data?: Data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static success<Data>(data?: Data, message?: string): CoreApiResponse<Data> {
        const resultCode: number = Code.SUCCESS.code;
        const resultMessage: string = message || Code.SUCCESS.message;
        return new CoreApiResponse(resultCode, resultMessage, data);
    }

    public static error<Data>(code?: number, message?: string, data?: Data): CoreApiResponse<Data> {
        const resultCode: number = code || Code.INTERNAL_ERROR.code;
        const resultMessage: string = message || Code.INTERNAL_ERROR.message;
        return new CoreApiResponse(resultCode, resultMessage, data);
    }
}
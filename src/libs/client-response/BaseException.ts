import { CodeDescription } from "#libs/client-response/Code";

export type CreateExceptionPayload<TData> = {
    code: CodeDescription,
    overrideMessage?: string,
    data?: TData
};

export class Exception<Data> extends Error {
    public readonly code: number;
    public readonly data: Data | undefined;

    private constructor(codeDescription: CodeDescription, overrideMessage?: string, data?: Data) {
        super();
        this.name = this.constructor.name;
        this.code = codeDescription.code;
        this.data = data;
        this.message = overrideMessage || codeDescription.message;

        Error.captureStackTrace(this, this.constructor);
    }

    public static new<Data>(payload: CreateExceptionPayload<Data>): Exception<Data> {
        return new Exception(payload.code, payload.overrideMessage, payload.data);
    }
}


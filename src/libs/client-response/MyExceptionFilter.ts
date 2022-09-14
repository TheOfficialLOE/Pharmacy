import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { CoreApiResponse } from "#libs/client-response/CoreApiResponse";
import { Exception } from "#libs/client-response/BaseException";

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
    public catch(exception: any, host: ArgumentsHost): void {
        const response: Response = host.switchToHttp().getResponse();
        if (exception instanceof Exception) {
            response
                .status(exception.code)
                .json(
                    CoreApiResponse.error(exception.code, exception.message, null)
                );
            return;
        }
        response.json("error bro")
    }
}
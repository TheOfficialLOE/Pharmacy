import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const ExtractToken = createParamDecorator(<T extends object>(data: string, ctx: ExecutionContext): T => {
    const request = <Request>ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data]: user as T;
})
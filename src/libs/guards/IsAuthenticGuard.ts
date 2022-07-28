import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { StaffRoles } from "../enums/StaffRolesEnum";
import { RolesKey } from "../tokens/RolesKey";
import { Request } from "express";

@Injectable()
export class IsAuthenticGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = <Request>context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.getAllAndOverride<StaffRoles[]>(RolesKey, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles) {
            return true;
        }
        return requiredRoles.some((role) => request.user["role"] === role);
    }
}
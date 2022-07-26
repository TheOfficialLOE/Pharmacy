import { StaffRoles } from "../Enums/StaffRolesEnum";
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesKey } from "../Tokens/RolesKey";
import { IsAuthenticGuard } from "../Guards/IsAuthenticGuard";
import { JwtAuthGuard } from "../Guards/JwtAuthGuard";

export const AccessibleBy = (...roles: StaffRoles[]) => {
    return applyDecorators(
        SetMetadata(RolesKey, roles),
        UseGuards(JwtAuthGuard, IsAuthenticGuard)
    );
}
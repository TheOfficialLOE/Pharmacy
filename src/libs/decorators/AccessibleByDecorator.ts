import { PharmacyRoles } from "../enums/StaffRolesEnum";
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesKey } from "../tokens/RolesKey";
import { IsAuthenticGuard } from "../guards/IsAuthenticGuard";
import { JwtAuthGuard } from "../guards/JwtAuthGuard";

export const AccessibleBy = (...roles: PharmacyRoles[]) => {
    return applyDecorators(
        SetMetadata(RolesKey, roles),
        UseGuards(JwtAuthGuard, IsAuthenticGuard)
    );
}
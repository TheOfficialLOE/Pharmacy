import { Body, Controller, Get, Param } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { GetStaffQuery } from "./query/GetStaffQuery";
import { GetStaffRequestDTO } from "./dtos/GetStaffRequestDTO";


@Controller("staff")
export class GetStaffController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @AccessibleBy(StaffRoles.OWNER)
    @Get(":id")
    async findStaff(@Param("id") id: string, @Body() body: GetStaffRequestDTO) {
        return await this.queryBus.execute(
            new GetStaffQuery({
                id,
                role: body.role
            })
        );
    }
}
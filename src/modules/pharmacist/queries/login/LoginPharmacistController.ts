import { Body, Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { LoginPharmacistRequestDTO } from "#modules/pharmacist/queries/login/dtos/LoginPharmacistRequestDTO";
import { LoginPharmacistQuery } from "#modules/pharmacist/queries/login/query/LoginPharmacistQuery";

@Controller("pharmacist")
export class LoginPharmacistController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Get()
    async login(@Body() body: LoginPharmacistRequestDTO) {
        const query = new LoginPharmacistQuery(body.email, body.password);
        return await this.queryBus.execute(query);
    }
}
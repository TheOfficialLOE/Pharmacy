import { Body, Controller, Get } from "@nestjs/common";
import { LoginAccountantRequestDTO } from "#modules/accountant/queries/login/dtos/LoginAccountantRequestDTO";
import { QueryBus } from "@nestjs/cqrs";
import { LoginAccountantQuery } from "#modules/accountant/queries/login/query/LoginAccountantQuery";

@Controller("auth/accountant")
export class LoginAccountantController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Get()
    async login(@Body() body: LoginAccountantRequestDTO) {
        const query = new LoginAccountantQuery(body.email, body.password);
        return await this.queryBus.execute(query);
    }
}
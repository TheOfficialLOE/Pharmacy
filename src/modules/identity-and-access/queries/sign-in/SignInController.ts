import { Body, Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { SignInRequestDto } from "#modules/identity-and-access/queries/sign-in/SignInRequestDto";
import { SignInQuery } from "#modules/identity-and-access/queries/sign-in/SignInQuery";

@Controller("auth")
export class SignInController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Get()
    async findStaff(@Body() body: SignInRequestDto) {
        return await this.queryBus.execute(
            new SignInQuery(body.email, body.password)
        );
    }
}
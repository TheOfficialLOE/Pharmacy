import { Body, Controller, Get, Inject } from "@nestjs/common";
import { SignInRequestDto } from "#modules/identity-and-access/queries/sign-in/SignInRequestDto";
import { SignInQuery } from "#modules/identity-and-access/queries/sign-in/SignInQuery";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { QueryBusPort } from "#libs/message/QueryBusPort";

@Controller("auth")
export class SignInController {
    constructor(
        @Inject(InfrastructureDiTokens.queryBus)
        private readonly queryBus: QueryBusPort
    ) {}

    @Get()
    public async findStaff(@Body() body: SignInRequestDto): Promise<string> {
        return await this.queryBus.sendQuery(
            new SignInQuery(body.email, body.password, body.role)
        );
    }
}
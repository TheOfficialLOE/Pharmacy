import { Controller, Get, Param } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetAccountantQuery } from "#modules/accountant/queries/get-accountant/query/GetAccountantQuery";

@Controller("accountant")
export class GetAccountantController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Get(":id")
    async getAccountant(@Param("id") id: string) {
        const query = new GetAccountantQuery(id);
        return await this.queryBus.execute(
            query
        );
    }
}
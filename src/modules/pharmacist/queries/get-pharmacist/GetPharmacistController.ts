import { Controller, Get, Param } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetPharmacistQuery } from "#modules/pharmacist/queries/get-pharmacist/query/GetPharmacistQuery";

@Controller("staff/pharmacist")
export class GetPharmacistController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Get(":id")
    async getPharmacist(@Param("id") id: string) {
        const query = new GetPharmacistQuery(id);
        return await this.queryBus.execute(
            query
        );
    }
}
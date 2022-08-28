import { Body, Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { SearchQuery } from "#modules/Inventory/queries/search/SearchQuery";
import { Drug } from "#modules/Inventory/domain/DrugDomainEntity";
import { SearchResponseDto } from "#modules/Inventory/queries/search/SearchResponseDto";

@Controller("inventory")
export class SearchController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Get()
    public async search(@Body() body: { drugName?: string, drugFamily?: string }) {
        const result = await this.queryBus.execute(
            new SearchQuery(body.drugName, body.drugFamily)
        ) as Drug[];
        return result.map(drug => new SearchResponseDto(drug));
    }
}
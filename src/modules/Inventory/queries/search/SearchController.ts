import { Body, Controller, Get, Inject } from "@nestjs/common";
import { SearchQuery } from "#modules/Inventory/queries/search/SearchQuery";
import { Drug } from "#modules/Inventory/domain/DrugDomainEntity";
import { SearchResponseDto } from "#modules/Inventory/queries/search/SearchResponseDto";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { QueryBusPort } from "#libs/message/QueryBusPort";

@Controller("inventory")
export class SearchController {
    constructor(
        @Inject(InfrastructureDiTokens.queryBus)
        private readonly queryBus: QueryBusPort
    ) {}

    @Get()
    public async search(@Body() body: { drugName?: string, drugFamily?: string }): Promise<SearchResponseDto[]> {
        const result = await this.queryBus.sendQuery<SearchQuery, Drug[]>(
            new SearchQuery(body.drugName, body.drugFamily)
        );
        return result.map(drug => new SearchResponseDto(drug));
    }
}
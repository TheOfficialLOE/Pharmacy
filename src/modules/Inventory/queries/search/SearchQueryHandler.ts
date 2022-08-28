import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchQuery } from "#modules/Inventory/queries/search/SearchQuery";
import { Inject } from "@nestjs/common";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { InventoryRepositoryPort } from "#modules/Inventory/infrastructure/InventoryRepositoryPort";
import { Drug } from "#modules/Inventory/domain/DrugDomainEntity";

@QueryHandler(SearchQuery)
export class SearchQueryHandler implements IQueryHandler<SearchQuery> {
    constructor(
        @Inject(InventoryDiTokens.inventoryRepository)
        private readonly inventoryRepository: InventoryRepositoryPort
    ) {}

    public async execute(query: SearchQuery): Promise<Drug[]> {
        return await this.inventoryRepository.search({ ...query });
    }
}
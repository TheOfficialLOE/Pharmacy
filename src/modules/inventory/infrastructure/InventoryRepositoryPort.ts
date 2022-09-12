import { RepositoryPort } from "#libs/ddd/base-classes/BaseRepositoryPort";
import { Drug } from "#modules/inventory/domain/DrugDomainEntity";

export interface InventoryRepositoryPort extends RepositoryPort<Drug> {
    update(drug: Drug): Promise<void>;
    search(query: { drugName?: string, drugFamily?: string }): Promise<Drug[]>;
}
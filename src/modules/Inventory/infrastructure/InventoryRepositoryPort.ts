import { BaseRepositoryPort } from "#libs/ddd/base-classes/BaseRepositoryPort";
import { Drug } from "#modules/Inventory/domain/DrugDomainEntity";

export interface InventoryRepositoryPort extends BaseRepositoryPort<Drug> {
    update(drug: Drug): Promise<void>;
    search(query: { drugName?: string, drugFamily?: string }): Promise<Drug[]>;
}
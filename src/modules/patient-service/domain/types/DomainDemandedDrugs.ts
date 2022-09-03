import { Drug } from "#modules/inventory/domain/DrugDomainEntity";

export type DemandedDrug = {
    drug: Drug, quantity: number
};
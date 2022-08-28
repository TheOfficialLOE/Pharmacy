import { Injectable } from "@nestjs/common";
import { InventoryRepositoryPort } from "#modules/inventory/infrastructure/InventoryRepositoryPort";
import { Drug } from "#modules/inventory/domain/DrugDomainEntity";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { DrugMapper } from "#modules/inventory/domain/DrugMapper";

@Injectable()
export class InventoryRepository implements InventoryRepositoryPort {
    constructor(
        private readonly prismaAdapter: PrismaAdapter,
        private readonly mapper: DrugMapper
    ) {}

    public async count(id: string): Promise<number> {
        return await this.prismaAdapter.drug.count({
            where: {
                id
            }
        });
    }

    public async create(entity: Drug): Promise<{ id: string }> {
        const drug = await this.prismaAdapter.drug.create({
            data: {
                ...this.mapper.toOrm(entity)
            }
        });
        return {
            id: drug.id
        };
    }

    public async update(drug: Drug): Promise<void> {
        await this.prismaAdapter.drug.update({
            where: {
                id: drug.id.value
            },
            data: {
                ...this.mapper.toOrm(drug)
            }
        })
    }

    public async findById(id: string): Promise<Drug> {
        const drug = await this.prismaAdapter.drug.findUnique({
            where: {
                id
            }
        });
        return this.mapper.toDomain(drug);
    }

    public async search(query: {
        drugName?: string, drugFamily?: string
    }): Promise<Drug[]> {
        const result = await this.prismaAdapter.drug.findMany({
            where: {
                drugName: query.drugName,
                drugFamily: query.drugFamily
            }
        });
        return result.map(drug => this.mapper.toDomain(drug));
    }
}
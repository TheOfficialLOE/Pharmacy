import { Injectable } from "@nestjs/common";
import { InventoryRepositoryPort } from "#modules/inventory/infrastructure/InventoryRepositoryPort";
import { Drug } from "#modules/inventory/domain/DrugDomainEntity";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { DrugMapper } from "#modules/inventory/domain/DrugMapper";
import { Exception } from "#modules/experimental/BaseException";
import { Code } from "#modules/experimental/Code";

@Injectable()
export class InventoryRepository implements InventoryRepositoryPort {
    constructor(
        private readonly prismaAdapter: PrismaAdapter,
        private readonly mapper: DrugMapper
    ) {}

    public async create(entity: Drug): Promise<void> {
        await this.prismaAdapter.drug.create({
            data: {
                ...this.mapper.toOrm(entity)
            }
        });
    }

    public async update(drug: Drug): Promise<void> {
        await this.prismaAdapter.drug.update({
            where: {
                id: drug.id.value
            },
            data: {
                ...this.mapper.toOrm(drug)
            }
        });
    }

    public async countById(id: string): Promise<number> {
        return await this.prismaAdapter.drug.count({
            where: {
                id
            }
        });
    }

    public async findById(id: string): Promise<Drug> {
        const drug = await this.prismaAdapter.drug.findUnique({
            where: {
                id
            }
        });
        if (drug !== null)
            return this.mapper.toDomain(drug);
        throw Exception.new({
            code: Code.NOT_FOUND_ERROR,
            overrideMessage: "Drug not found"
        });
    }
}
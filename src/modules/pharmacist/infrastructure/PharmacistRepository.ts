import { Injectable } from "@nestjs/common";
import { PharmacistRepositoryPort } from "./PharmacistRepositoryPort";
import { Pharmacist } from "#modules/pharmacist/domain/PharmacistDomainEntity";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { Repository } from "#libs/ddd/base-classes/BaseRepository";
import { PharmacistMapper } from "#modules/pharmacist/domain/PharmacistMapper";

@Injectable()
export class PharmacistRepository extends Repository<PharmacistMapper> implements PharmacistRepositoryPort {
    constructor(
        protected readonly prismaAdapter: PrismaAdapter,
    ) {
        super(prismaAdapter, new PharmacistMapper());
    }

    async create(pharmacist: Pharmacist) {
        const persistedPharmacist = await this.prismaAdapter.pharmacist.create({
            data: {
                ...this.mapper.toOrm(pharmacist)
            }
        });
        return { id: persistedPharmacist.id };
    }

    async findById(id: string): Promise<Pharmacist> {
        const pharmacist = await this.prismaAdapter.pharmacist.findUnique({
            where: {
                id
            }
        });
        return this.mapper.toDomain(pharmacist);
    }

    async findByEmail(email: string): Promise<Pharmacist> {
        const pharmacist = await this.prismaAdapter.pharmacist.findUnique({
            where: {
                email
            }
        })
        return this.mapper.toDomain(pharmacist);
    }
}
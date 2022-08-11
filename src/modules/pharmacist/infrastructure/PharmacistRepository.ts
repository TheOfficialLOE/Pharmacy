import { Injectable } from "@nestjs/common";
import { PharmacistRepositoryPort } from "./PharmacistRepositoryPort";
import { Pharmacist } from "#modules/pharmacist/domain/PharmacistEntity";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";

@Injectable()
export class PharmacistRepository implements PharmacistRepositoryPort {
    constructor(
        private readonly prismaAdapter: PrismaAdapter
    ) {}

    async create(pharmacist: Pharmacist) {
        const persistedPharmacist = await this.prismaAdapter.pharmacist.create({
            data: {
                ...pharmacist.toObject()
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
        return Pharmacist.new(pharmacist);
    }

}
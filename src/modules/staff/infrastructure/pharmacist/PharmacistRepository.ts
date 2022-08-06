import { Injectable } from "@nestjs/common";
import { PharmacistRepositoryPort } from "./PharmacistRepositoryPort";
import { Pharmacist } from "../../domain/pharmacist/PharmacistEntity";
import { PrismaAdapter } from "../../../../infrastructure/prisma/PrismaAdapter";

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

    async findAll(): Promise<Pharmacist[]> {
        return Promise.resolve([]);
    }
}
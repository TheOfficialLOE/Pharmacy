import { Injectable } from "@nestjs/common";
import { PharmacistRepositoryPort } from "./PharmacistRepositoryPort";
import { Pharmacist } from "../Domain/PharmacistEntity";
import { PrismaAdapter } from "../../../../Infrastructure/Prisma/PrismaAdapter";

@Injectable()
export class PharmacistRepository implements PharmacistRepositoryPort {
    constructor(
        private readonly prismaAdapter: PrismaAdapter
    ) {}

    async create(pharmacist: Pharmacist) {
        await this.prismaAdapter.pharmacist.create({
            data: {
                ...pharmacist.toObject()
            }
        });
    }
}
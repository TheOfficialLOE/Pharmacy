import { Injectable } from "@nestjs/common";
import { AccountantRepositoryPort } from "./AccountantRepositoryPort";
import { Accountant } from "../../domain/accountant/AccountantEntity";
import { PrismaAdapter } from "../../../../infrastructure/prisma/PrismaAdapter";

@Injectable()
export class AccountantRepository implements AccountantRepositoryPort {
    constructor(
       private readonly prismaAdapter: PrismaAdapter
    ) {}

    async create(accountant: Accountant): Promise<{ id: string }> {
        await this.prismaAdapter.accountant.create({
            data: {
                ...accountant.toObject()
            }
        })
        return { id: accountant.getId() };
    }

    async find(id: string): Promise<Accountant> {
        const accountant = await this.prismaAdapter.accountant.findUnique({
            where: {
                id
            }
        });
        return Accountant.loadExisting(accountant)
    }

}
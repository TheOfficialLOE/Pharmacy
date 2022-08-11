import { Injectable } from "@nestjs/common";
import { AccountantRepositoryPort } from "./AccountantRepositoryPort";
import { Accountant } from "#modules/accountant/domain/AccountantEntity";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";

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

    async findById(id: string): Promise<Accountant> {
        const accountant = await this.prismaAdapter.accountant.findUnique({
            where: {
                id
            }
        });
        return Accountant.new(accountant);
    }

    async findByEmail(email: string): Promise<Accountant> {
        const accountant = await this.prismaAdapter.accountant.findUnique({
            where: {
                email
            }
        })
        return Accountant.new(accountant);
    }
}
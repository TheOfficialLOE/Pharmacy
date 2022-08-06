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

    async findAll(): Promise<Accountant[]> {
        return Promise.resolve([]);
    }

}
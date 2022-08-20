import { Injectable } from "@nestjs/common";
import { AccountantRepositoryPort } from "./AccountantRepositoryPort";
import { Accountant } from "#modules/accountant/domain/AccountantDomainEntity";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { Repository } from "#libs/ddd/base-classes/BaseRepository";
import { AccountantMapper } from "#modules/accountant/domain/AccountantMapper";

@Injectable()
export class AccountantRepository extends Repository<AccountantMapper> implements AccountantRepositoryPort {
    constructor(
       protected readonly prismaAdapter: PrismaAdapter
    ) {
        super(prismaAdapter, new AccountantMapper());
    }

    public async create(accountant: Accountant): Promise<{ id: string }> {
        await this.prismaAdapter.accountant.create({
            data: {
                ...this.mapper.toOrm(accountant)
            }
        })
        return { id: accountant.id.value };
    }

    public async findById(id: string): Promise<Accountant> {
        const accountant = await this.prismaAdapter.accountant.findUnique({
            where: {
                id
            }
        });
        return this.mapper.toDomain(accountant);
    }

    public async findByEmail(email: string): Promise<Accountant> {
        const accountant = await this.prismaAdapter.accountant.findUnique({
            where: {
                email
            }
        })
        return this.mapper.toDomain(accountant);
    }
}
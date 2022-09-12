import { Injectable } from "@nestjs/common";
import { StaffMapper } from "#modules/identity-and-access/domain/StaffMapper";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";

@Injectable()
export class StaffRepository implements StaffRepositoryPort {
    constructor(
        private readonly prismaAdapter: PrismaAdapter,
        private readonly mapper: StaffMapper
    ) {}

    public async create(staff: Staff): Promise<void> {
        await this.prismaAdapter.staff.create({
            data: {
                ...this.mapper.toOrm(staff)
            }
        });
    }

    public async countById(id: string): Promise<number> {
        return await this.prismaAdapter.staff.count({
            where: {
                id
            }
        });
    }

    public async findById(id: string): Promise<Staff> {
        const staff = await this.prismaAdapter.staff.findUnique({
           where: {
               id
           }
        });
        return this.mapper.toDomain(staff);
    }

    public async findByEmail(email: string): Promise<Staff> {
        const staff = await this.prismaAdapter.staff.findFirst({
           where: {
               email
           }
        });
        if (staff !== null) {
            return this.mapper.toDomain(staff);
        }
    }
}
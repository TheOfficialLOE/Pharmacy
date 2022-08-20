import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { GenericRepositoryPort } from "#libs/base-classes/GenericRepositoryPort";

export abstract class Repository<Mapper> implements GenericRepositoryPort<any> {
    protected constructor(
        protected readonly prismaAdapter: PrismaAdapter,
        protected readonly mapper: Mapper
    ) {}

    abstract create(entity: any): Promise<{ id: string }>;

    abstract findById(id: string): Promise<any>;
}
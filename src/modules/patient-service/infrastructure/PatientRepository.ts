import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { Patient } from "#modules/patient-service/domain/PatientDomainEntity";
import { PatientMapper } from "#modules/patient-service/domain/PatientMapper";
import { DomainEvents } from "#libs/ddd/domain-events/DomainEvents";

export class PatientRepository implements PatientRepositoryPort {
    constructor(
        private readonly prismaAdapter: PrismaAdapter,
        private readonly mapper: PatientMapper
    ) {}

    public async count(id: string): Promise<number> {
        return await this.prismaAdapter.patient.count({
            where: {
                id
            }
        });
    }

    public async create(patient: Patient): Promise<void> {
        await this.prismaAdapter.patient.create({
            data: {
                ...this.mapper.toOrm(patient)
            }
        });
        await DomainEvents.publishEvents(patient.id);
    }


    public async findById(id: string): Promise<Patient> {
        return Promise.resolve(undefined);
    }
}
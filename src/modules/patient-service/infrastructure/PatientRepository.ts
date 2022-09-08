import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { Patient, PatientStatus } from "#modules/patient-service/domain/PatientDomainEntity";
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
                status: "WAITING"
            }
        });
    }

    public async create(patient: Patient): Promise<void> {
        await this.prismaAdapter.patient.create({
            data: {
                ...this.mapper.toOrm(patient)
            }
        });
    }

    public async findById(id: string): Promise<Patient> {
        return Promise.resolve(undefined);
    }

    public async findFirst(): Promise<Patient> {
        const patient = await this.prismaAdapter.patient.findFirst({
            where: {
                status: "WAITING"
            },
            orderBy: {
                visitedAt: "asc"
            }
        });
        return this.mapper.toDomain(patient);
    }

    public async update(patient: Patient): Promise<void> {
        await this.prismaAdapter.patient.update({
            where: {
                id: patient.id.value
            },
            data: {
                ...this.mapper.toOrm(patient)
            }
        });
        await DomainEvents.publishEvents(patient.id);
    }

    public async countByStatus(status: PatientStatus): Promise<number> {
        return await this.prismaAdapter.patient.count({
            where: {
                status
            }
        });
    }

    public async findByCode(code: string): Promise<Patient> {
        const patient = await this.prismaAdapter.patient.findUnique({
            where: {
                code
            }
        });
        return this.mapper.toDomain(patient);
    }

    public async countPharmacistInProgressPatients(pharmacistId: string): Promise<number> {
        return await this.prismaAdapter.patient.count({
            where: {
                pharmacistId,
                status: "WAITING"
            }
        })
    }
}
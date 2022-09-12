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

    public async create(patient: Patient): Promise<void> {
        await this.prismaAdapter.patient.create({
            data: {
                ...this.mapper.toOrm(patient)
            }
        });
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

    public async countById(id: string): Promise<number> {
        return await this.prismaAdapter.patient.count({
            where: {
                id
            }
        });
    }

    public async countPharmacistInProgressPatients(pharmacistId: string): Promise<number> {
        return await this.prismaAdapter.patient.count({
            where: {
                pharmacistId,
                status: "IN_PROCESS"
            }
        })
    }

    public async findById(id: string): Promise<Patient> {
        const patient = await this.prismaAdapter.patient.findUnique({
            where: {
                id
            }
        });
        return this.mapper.toDomain(patient);
    }

    public async findByCode(code: string): Promise<Patient> {
        const patient = await this.prismaAdapter.patient.findUnique({
            where: {
                code
            }
        });
        if (patient !== null)
            return this.mapper.toDomain(patient);
        throw new Error("Patient not found");    
    }

    public async findFirstWaiting(): Promise<Patient> {
        const patient = await this.prismaAdapter.patient.findFirst({
            where: {
                status: "WAITING"
            },
            orderBy: {
                visitedAt: "asc"
            }
        });
        if (patient !== null)
            return this.mapper.toDomain(patient);
        throw new Error("None of the patients is waiting");
    }
}
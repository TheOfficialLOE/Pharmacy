import { RepositoryPort } from "#libs/ddd/base-classes/RepositoryPort";
import { Patient, PatientStatus } from "#modules/patient-service/domain/PatientDomainEntity";

export interface PatientRepositoryPort extends RepositoryPort<Patient> {
    countByStatus(status: PatientStatus): Promise<number>;
    countPharmacistInProgressPatients(pharmacistId: string): Promise<number>;
    findByCode(code: string): Promise<Patient>;
    findFirst(): Promise<Patient>;
    update(patient: Patient): Promise<void>;
}
import { Mapper } from "#libs/ddd/base-classes/BaseMapper";
import { Patient as DomainPatient, PatientStatus } from "#modules/patient-service/domain/PatientDomainEntity";
import { OrmPatient } from "#modules/patient-service/domain/PatientOrmEntity";
import { ID } from "#libs/ddd/value-objects/IdVO";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientMapper implements Mapper<DomainPatient, OrmPatient> {
    public toDomain(ormEntity: OrmPatient): DomainPatient {
        return new DomainPatient({
            pharmacistId: ormEntity.pharmacistId,
            code: ormEntity.code,
            status: ormEntity.status as PatientStatus,
            visitedAt: ormEntity.visitedAt
        }, new ID(ormEntity.id));
    }

    public toOrm(domainEntity: DomainPatient): OrmPatient {
        return {
            id: domainEntity.id.value,
            pharmacistId: domainEntity.pharmacistId,
            code: domainEntity.code,
            status: domainEntity.status,
            visitedAt: domainEntity.visitedAt
        };
    }
}
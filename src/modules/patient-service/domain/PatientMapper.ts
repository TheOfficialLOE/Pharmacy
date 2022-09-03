import { Mapper } from "#libs/ddd/base-classes/BaseMapper";
import { Patient as DomainPatient, PatientState } from "#modules/patient-service/domain/PatientDomainEntity";
import { OrmPatient } from "#modules/patient-service/domain/PatientOrmEntity";
import { ID } from "#libs/ddd/value-objects/IdVO";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientMapper implements Mapper<DomainPatient, OrmPatient> {
    public toDomain(ormEntity: OrmPatient): DomainPatient {
        return new DomainPatient({
            code: ormEntity.code,
            state: ormEntity.state as PatientState,
            visitedAt: ormEntity.visitedAt
        }, new ID(ormEntity.id));
    }

    public toOrm(domainEntity: DomainPatient): OrmPatient {
        return {
            id: domainEntity.id.value,
            code: domainEntity.code,
            state: domainEntity.state,
            visitedAt: domainEntity.visitedAt
        };
    }
}
import { Injectable } from "@nestjs/common";
import { Mapper } from "#libs/ddd/base-classes/BaseMapper";
import { DrugOrm } from "#modules/inventory/domain/DrugOrmEntity";
import { Drug as DrugDomain } from "#modules/inventory/domain/DrugDomainEntity";
import { ID } from "#libs/ddd/value-objects/IdVO";

@Injectable()
export class DrugMapper implements Mapper<DrugDomain, DrugOrm> {
    public toDomain(ormEntity: DrugOrm): DrugDomain {
        return new DrugDomain({
            ...ormEntity
        }, new ID(ormEntity.id));
    }

    public toOrm(domainEntity: DrugDomain): DrugOrm {
        return {
            id: domainEntity.id.value,
            supplierId: domainEntity.supplierId,
            supplierOrganization: domainEntity.supplierOrganization,
            drugName: domainEntity.drugName,
            drugFamily: domainEntity.drugFamily,
            manufactureDate: domainEntity.manufactureDate,
            expirationDate: domainEntity.expirationDate,
            suppliedAt: domainEntity.suppliedAt,
            requiresDoctorPrescription: domainEntity.requiresDoctorPrescription,
            price: domainEntity.price,
            quantity: domainEntity.quantity
        };
    }
}
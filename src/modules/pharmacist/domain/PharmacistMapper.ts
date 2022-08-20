import { Mapper } from "#libs/ddd/base-classes/BaseMapper";
import { Pharmacist } from "#modules/pharmacist/domain/PharmacistDomainEntity";
import { OrmPharmacist } from "#modules/pharmacist/domain/PharmacistOrmEntity";
import { ID } from "#libs/ddd/value-objects/IdVO";
import { DateVO } from "#libs/ddd/value-objects/DateVO";
import { Password } from "#libs/ddd/value-objects/PasswordVO";
import { Name } from "#libs/ddd/value-objects/NameVO";
import { Email } from "#libs/ddd/value-objects/EmailVO";

export class PharmacistMapper implements Mapper<Pharmacist, OrmPharmacist> {
    public toDomain(ormEntity: OrmPharmacist): Pharmacist {
        const { id, name, email, password, currentPatientCode, createdAt, updatedAt } = ormEntity;
        return new Pharmacist({
            id: new ID(id),
            createdAt: new DateVO(createdAt),
            updatedAt: new DateVO(updatedAt),
            props: {
                name: new Name(name),
                email: new Email(email),
                password: new Password(password),
                currentPatient: currentPatientCode,
                todaySales: {}
            }
        });
    }

    public toOrm(domainEntity: Pharmacist): OrmPharmacist {
        const { id, name, email, password, currentPatient, createdAt, updatedAt } = domainEntity;
        return {
            id: id.value,
            name: name.value,
            email: email.value,
            password: password.value,
            currentPatientCode: currentPatient?.code,
            createdAt: createdAt.value,
            updatedAt: createdAt.value
        };
    }

}
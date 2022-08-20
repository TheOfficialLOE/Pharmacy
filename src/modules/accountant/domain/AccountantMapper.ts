import { Mapper } from "#libs/ddd/base-classes/BaseMapper";
import { OrmAccountant } from "#modules/accountant/domain/AccountantOrmEntity";
import { Accountant } from "#modules/accountant/domain/AccountantDomainEntity";
import { ID } from "#libs/ddd/value-objects/IdVO";
import { DateVO } from "#libs/ddd/value-objects/DateVO";
import { Email } from "#libs/ddd/value-objects/EmailVO";
import { Password } from "#libs/ddd/value-objects/PasswordVO";
import { Name } from "#libs/ddd/value-objects/NameVO";

export class AccountantMapper implements Mapper<Accountant, OrmAccountant> {
    public toDomain(ormEntity: OrmAccountant): Accountant {
        const { id, createdAt, updatedAt, name, email, password } = ormEntity;
        return new Accountant({
            id: new ID(id),
            props: {
                name: new Name(name),
                email: new Email(email),
                password: new Password(password),
                suppliedDrugs: [],
            },
            createdAt: new DateVO(createdAt),
            updatedAt: new DateVO(updatedAt)
        });
    }

    public toOrm(domainEntity: Accountant): OrmAccountant {
        const { id, name, email, password, createdAt, updatedAt } = domainEntity;
        return {
            id: id.value,
            name: name.value,
            email: email.value,
            password: password.value,
            createdAt: createdAt.value,
            updatedAt: updatedAt?.value
        };
    }
}
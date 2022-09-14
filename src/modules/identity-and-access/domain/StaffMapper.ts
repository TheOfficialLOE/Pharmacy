import { Mapper } from "#libs/ddd/base-classes/BaseMapper";
import { StaffOrm } from "#modules/identity-and-access/domain/StaffOrmEntity";
import { Staff as StaffDomain } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { ID } from "#libs/ddd/value-objects/IdVO";
import { Password } from "#libs/ddd/value-objects/PasswordVO";
import { DateVO } from "#libs/ddd/value-objects/DateVO";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StaffMapper implements Mapper<StaffDomain, StaffOrm> {
    public toDomain(staffOrm: StaffOrm): StaffDomain {
        const { id, name, email, password, role, joinedAt } = staffOrm;
        return new StaffDomain({
            name: name,
            email: email,
            password: new Password(password),
            role: role as StaffRoles,
            joinedAt: new DateVO(joinedAt)
        }, new ID(id));
    }

    public toOrm(staffDomain: StaffDomain): StaffOrm {
        const { id, name, email, password, role, joinedAt } = staffDomain;
        return {
            id: id.value,
            name: name,
            email: email,
            password: password.value,
            joinedAt: joinedAt.value,
            role
        };
    }

}
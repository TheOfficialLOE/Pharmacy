import { CreateStaffPayload } from "../commands/create-staff/payload/CreateStaffPayload";
import { StaffRoles } from "../../../libs/enums/StaffRolesEnum";
import { Accountant } from "./accountant/AccountantEntity";
import { Pharmacist } from "./pharmacist/PharmacistEntity";

export const createStaffFactory = (createStaffPayload: CreateStaffPayload) => {
    const { role, ...payload } = createStaffPayload;
    switch (role) {
        case StaffRoles.ACCOUNTANT:
            return Accountant.registerNew(payload);
        case StaffRoles.PHARMACIST:
            return Pharmacist.registerNew(payload);
    }
}
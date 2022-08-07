import { Accountant } from "../../../domain/accountant/AccountantEntity";
import { Pharmacist } from "../../../domain/pharmacist/PharmacistEntity";

export class GetStaffResponseDTO {
    constructor(staff: Accountant | Pharmacist) {
        if (staff instanceof Accountant) {
            return {
                name: staff.getName(),
                joinedAt: staff.getDateJoined(),
                updatedAt: staff.getUpdatedAt(),
                suppliedDrugs: staff.getSuppliedDrugs()
            }
        }
        else {
            // todo
            return {
                name: staff.getName(),
                joinedAt: staff.getDateJoined(),
                updatedAt: staff.getUpdatedAt()
            }
        }
    }
}
import { UseCase } from "#libs/base-classes/BaseUseCase";
import {
    CreatePharmacistCommand
} from "#modules/staff/pharmacist/commands/create-pharmacist/command/CreatePharmacistCommand";
import {
    CreatePharmacistResponseDTO
} from "#modules/staff/pharmacist/commands/create-pharmacist/dtos/CreatePharmacistResponseDTO";

export interface CreatePharmacistUseCase extends UseCase<CreatePharmacistCommand, CreatePharmacistResponseDTO> {

}
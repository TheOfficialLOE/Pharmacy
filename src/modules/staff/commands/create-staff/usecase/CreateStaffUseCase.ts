import { UseCase } from "#libs/base-classes/BaseUseCase";
import { CreateStaffPayload } from "../payload/CreateStaffPayload";
import { CreateStaffResponseDTO } from "../dtos/CreateStaffResponseDTO";

export interface CreateStaffUseCase extends UseCase<CreateStaffPayload, CreateStaffResponseDTO> {

}
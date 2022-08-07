import { UseCase } from "#libs/base-classes/BaseUseCase";
import { GetStaffPayload } from "../payload/GetStaffPayload";
import { GetStaffResponseDTO } from "../dtos/GetStaffResponseDTO";

export interface GetStaffUseCase extends UseCase<GetStaffPayload, GetStaffResponseDTO> {

}
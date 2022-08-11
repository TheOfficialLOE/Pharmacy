import { UseCase } from "#libs/base-classes/BaseUseCase";
import { GetPharmacistQuery } from "#modules/pharmacist/queries/get-pharmacist/query/GetPharmacistQuery";
import { GetPharmacistResponseDTO } from "#modules/pharmacist/queries/get-pharmacist/dto/GetPharmacistResponseDTO";

export interface GetPharmacistUseCase extends UseCase<GetPharmacistQuery, GetPharmacistResponseDTO> {

}
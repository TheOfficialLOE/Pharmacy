import { UseCase } from "#libs/base-classes/BaseUseCase";
import { GetAccountantQuery } from "#modules/accountant/queries/get-accountant/query/GetAccountantQuery";
import { GetAccountantResponseDTO } from "#modules/accountant/queries/get-accountant/dto/GetAccountantResponseDTO";

export interface GetAccountantUseCase extends UseCase<GetAccountantQuery, GetAccountantResponseDTO> {

}
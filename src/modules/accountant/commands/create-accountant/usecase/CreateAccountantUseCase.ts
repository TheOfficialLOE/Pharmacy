import { UseCase } from "#libs/base-classes/BaseUseCase";
import {
    CreateAccountantCommand
} from "#modules/accountant/commands/create-accountant/command/CreateAccountantCommand";
import {
    CreateAccountantResponseDTO
} from "#modules/accountant/commands/create-accountant/dtos/CreateAccountantResponseDTO";

export interface CreateAccountantUseCase extends UseCase<CreateAccountantCommand, CreateAccountantResponseDTO> {

}
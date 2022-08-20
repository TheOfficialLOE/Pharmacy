import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
    CreatePharmacistCommand
} from "#modules/pharmacist/commands/create-pharmacist/command/CreatePharmacistCommand";
import { Inject } from "@nestjs/common";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import { PharmacistRepository } from "#modules/pharmacist/infrastructure/PharmacistRepository";
import { Pharmacist } from "#modules/pharmacist/domain/PharmacistDomainEntity";

@CommandHandler(CreatePharmacistCommand)
export class CreatePharmacistCommandHandler implements ICommandHandler<CreatePharmacistCommand> {
    constructor(
        // @Inject(PharmacistDiTokens.createPharmacistUseCase)
        // private readonly createPharmacistUseCase: CreatePharmacistUseCase
        @Inject(PharmacistDiTokens.pharmacistRepository)
        private readonly pharmacistRepository: PharmacistRepository
    ) {}

    async execute(command: CreatePharmacistCommand) {
        const pharmacist = await Pharmacist.registerNew({
            name: command.name,
            email: command.email,
            password: command.password
        });
        return await this.pharmacistRepository.create(pharmacist);
        // command.password = await bcrypt.hash(command.password, 10);
        // return await this.createPharmacistUseCase.execute(command);
    }
}
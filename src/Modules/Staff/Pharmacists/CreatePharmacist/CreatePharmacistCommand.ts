import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { PharmacistDITokens } from "../../../../Libs/Tokens/PharmacistDITokens";
import * as bcrypt from 'bcrypt';
import { CreatePharmacistUseCase } from "./CreatePharmacistUseCase";


export class CreatePharmacistCommand {
    constructor(
        public name: string,
        public password: string
    ) {}
}

@CommandHandler(CreatePharmacistCommand)
export class CreatePharmacistCommandHandler implements ICommandHandler<CreatePharmacistCommand> {
    constructor(
        @Inject(PharmacistDITokens.CreatePharmacist)
        private readonly createPharmacistUseCase: CreatePharmacistUseCase
    ) {}

    async execute(command: CreatePharmacistCommand) {
        let { name, password } = command;
        password = await bcrypt.hash(command.password, 10);
        await this.createPharmacistUseCase.execute({
            name,
            password
        });
    }
}
import { Controller, Inject, Post } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";
import { Patient } from "#modules/patient-service/domain/PatientDomainEntity";
import { NewPatientCommand } from "#modules/patient-service/commands/new-patient/NewPatientCommand";

// patient walks in, enters the email, find some drug, waits, go to the pharmacist and pays
// patient doesn't need a password, can sign up with name and email, or logs in with just email.
// patient adds the drugs to a shopping cart
// patient waits

// ----------------------------------------------------------------------------

// patient walks in, gets a code with optional name and email
// waits
// goes to a pharmacist, gives what he needs and booom heehee

@Controller("patient-service")
export class NewPatientController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Post()
    public async newPatient(): Promise<void> {
        await this.commandBus.sendCommand(new NewPatientCommand());
    }
}
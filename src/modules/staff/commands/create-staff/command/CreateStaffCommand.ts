import { ICommand } from "@nestjs/cqrs";
import { CreateStaffPayload } from "../payload/CreateStaffPayload";

export class CreateStaffCommand implements ICommand {
    constructor(
        public payload: CreateStaffPayload
    ) {}
}
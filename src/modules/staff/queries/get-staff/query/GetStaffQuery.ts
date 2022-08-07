import { IQuery } from "@nestjs/cqrs";
import { GetStaffPayload } from "../payload/GetStaffPayload";

export class GetStaffQuery implements IQuery {
    constructor(
        public payload: GetStaffPayload
    ) {}
}
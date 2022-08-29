import { ICommand } from "@nestjs/cqrs";

export class RegisterCargoCommand implements ICommand {
    constructor(
        public drug: {
            supplierId: string;
            supplierOrganization: string;
            drugName: string;
            drugFamily: string;
            manufactureDate: Date;
            expirationDate: Date;
            requiresDoctorPrescription: boolean;
            price: number;
            quantity: number;
        }
    ) {}
}
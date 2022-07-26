import { Injectable } from "@nestjs/common";
import { PharmacistRepositoryPort } from "../Infrastructure/PharmacistRepositoryPort";
import { CreatePharmacistPayload, Pharmacist } from "../Domain/PharmacistEntity";
import { UseCase } from "../../../../Libs/BaseClasses/BaseUseCase";
import { CreatePharmacistResponseDTO } from "./CreatePharmacistDTOs";

@Injectable()
export class CreatePharmacistUseCase implements UseCase<CreatePharmacistPayload, CreatePharmacistResponseDTO> {
    constructor (
        private readonly pharmacistRepository: PharmacistRepositoryPort
    ) {}

    async execute(payload: CreatePharmacistPayload) {
        const pharmacist = Pharmacist.registerNew(payload);
        await this.pharmacistRepository.create(pharmacist);
        return {
            message: "Pharmacist created successfully"
        }
    }
}

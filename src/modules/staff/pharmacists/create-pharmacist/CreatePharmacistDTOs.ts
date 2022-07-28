import { IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreatePharmacistRequestDTO {
    @IsString()
    @MinLength(10)
    @MaxLength(30)
    name: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string;
}

export interface CreatePharmacistResponseDTO {
    id: string;
    name: string;
    dateJoined: Date;
}
import { IsBoolean, IsDateString, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class RegisterCargoRequestDto {
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    public readonly supplierOrganization: string;

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    public readonly drugName: string;

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    public readonly drugFamily: string;

    @IsDateString()
    public readonly manufactureDate: Date;

    @IsDateString()
    public readonly expirationDate: Date;

    @IsBoolean()
    public readonly requiresDoctorPrescription: boolean;

    @IsNumber()
    public readonly price: number;

    @IsNumber()
    @Min(1)
    public readonly quantity: number;
}
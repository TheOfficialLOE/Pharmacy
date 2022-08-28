import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class UpdateDrugQuantityRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly drugId: string;

    @IsNumber()
    @Min(1)
    public readonly quantity: number;
}
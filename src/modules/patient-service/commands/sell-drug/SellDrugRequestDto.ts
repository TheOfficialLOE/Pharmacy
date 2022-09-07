import { IsDefined, IsNumber, IsString, Length, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class DemandedDrug {
    @IsString()
    @IsDefined()
    public readonly drugId: string;

    @IsNumber()
    @Min(1)
    public readonly quantity: number;
}

export class SellDrugRequestDto {
    @IsString()
    @Length(4)
    public readonly patientCode: string;

    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => DemandedDrug)
    public readonly demandedDrugs: DemandedDrug[];
}
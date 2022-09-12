import { IsString, Length } from "class-validator";

export class GetPatientInfoRequestDto {
    @IsString()
    @Length(4)
    public readonly patientCode: string;
}
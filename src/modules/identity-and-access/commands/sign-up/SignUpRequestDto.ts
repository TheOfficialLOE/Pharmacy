import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpRequestDto {
    @IsString()
    @IsEmail()
    @MinLength(8)
    @MaxLength(30)
    public readonly email: string;

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    public readonly name: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    public readonly password: string;

    @IsEnum(StaffRoles)
    public readonly role: StaffRoles;
}
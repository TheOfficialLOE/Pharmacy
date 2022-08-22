import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";

export class SignInRequestDto {
    @IsString()
    @IsEmail()
    @MinLength(8)
    @MaxLength(30)
    public email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    public password: string;

    @IsEnum(StaffRoles)
    public readonly role: StaffRoles;
}
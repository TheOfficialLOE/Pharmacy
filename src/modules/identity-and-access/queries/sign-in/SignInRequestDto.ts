import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

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
}
import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class LoginAuthDto{

    @IsNotEmpty({ message: 'El DNI es requerido' })
    @IsString()
    @Length(8, 8, { message: 'El DNI debe tener 8 dígitos' })
    dni: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
    password: string;
}
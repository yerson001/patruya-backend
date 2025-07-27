import { IsString, IsNotEmpty, MinLength, Length } from "class-validator";

export class RegisterAuthDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty({ message: 'El DNI es requerido' })
    @IsString()
    @Length(8, 8, { message: 'El DNI debe tener 8 dígitos' })
    dni: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
    password: string;
    
    rolesIds: string[];

}
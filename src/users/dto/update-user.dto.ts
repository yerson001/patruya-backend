import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: String;

    @IsString()
    @IsOptional()
    lastname?: String;

    @IsString()
    @IsOptional()
    phone?: String;

    image?: String;

    notification_token?: String;
}
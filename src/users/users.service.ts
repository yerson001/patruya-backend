import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import uploadToCloudinary from '../utils/cloud_storage';
const uploadToCloudinary = require('../utils/cloud_storage');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    create(userData: CreateUserDto) {
        const newUser = this.userRepository.create(userData);
        return this.userRepository.save(newUser);
    }

    findAll() {
        return this.userRepository.find({relations: ['roles']});
    }

    async update(id: number, userData: UpdateUserDto) {
        const userFound = await this.userRepository.findOneBy({ id: id });
        if (!userFound) {
            throw new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND);
        }
        const updatedUser = Object.assign(userFound, userData);

        return this.userRepository.save(updatedUser);
    }

    async updateWithImage(file: Express.Multer.File, id: number, userData: UpdateUserDto) {
        try {
            if (!file) {
                throw new Error('No se proporcionó un archivo para subir.');
            }
            const url = await uploadToCloudinary(file);


            if (url === undefined && url === null) {
                throw new HttpException('La Imagen no se pudo Guardar', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            //console.log("URL del archivo subido:", url);

            const userFound = await this.userRepository.findOneBy({ id: id });

            if (!userFound) {
                throw new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND);
            }

            userData.image = url;
            const UpdateUser = Object.assign(userFound, userData);
            return this.userRepository.save(UpdateUser);
            //return { success: true, url }; 
        } catch (error) {
            console.error("Error al subir la imagen:", error.message);
            throw new Error('Error al subir la imagen');
        }
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Rol) private rolesRepository: Repository<Rol>){}

    create(rolData: CreateRolDto){
        const newRol = this.rolesRepository.create(rolData);
        return this.rolesRepository.save(newRol);
    }
}

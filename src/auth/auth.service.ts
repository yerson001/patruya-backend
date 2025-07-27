import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { loadEnvFile } from 'process';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Rol) private rolRepository: Repository<Rol>,
        private jwtService: JwtService
    ) { }

    async register(userData: RegisterAuthDto) {

        const { email, phone } = userData;

        /************************************************************* 
        * validar datos iportantes que no puede repetirce cuando 
        * se registran los usuarios
        ************************************************************* */
        
        const emailExist = await this.userRepository.findOneBy({ email: email });
        if (emailExist) {
            throw new HttpException('El email ya esta registrado', HttpStatus.CONFLICT);
        }

        const phoneExist = await this.userRepository.findOneBy({ phone: phone });
        if (phoneExist) {
            throw new HttpException('El teléfono ya esta registrado', HttpStatus.CONFLICT);
        }

        /*
        const dniExist = await this.userRepository.findOneBy({dni: dni});
        if(dniExist){
            throw new HttpException('El dni ya fue registrado',HttpStatus.CONFLICT);
        }
        */


        const newUser = this.userRepository.create(userData);

        /************************************************************* 
        * Al no proporcionar un rol especifico se por defecto como  
        * ciudadano  {ADMIN,OFFICER,CITIZER}
        ************************************************************* */
        const rolesids = Array.isArray(userData.rolesIds) ? userData.rolesIds : ['CITIZEN'];

        //const rolesids = userData.rolesIds;

        /************************************************************* 
        * Buscar los roles creadas en la base de datos  
        * un usuairo puede tener mas de un rol
        ************************************************************* */

        const roles = rolesids.length > 0
            ? await this.rolRepository.findBy({ id: In(rolesids) })
            : [];
        newUser.roles = roles;

        const userSaved = await this.userRepository.save(newUser);

        const rolesString = userSaved.roles.map(rol => rol.id);

        const payload = {
            id: userSaved.id,
            name: userSaved.name,
            roles: rolesString
        };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userSaved,
            token: 'Bearer ' + token
        }

        delete data.user.password;
        return data;
    }

    async login(loginData: LoginAuthDto) {
        const { email, password } = loginData;
        const userFound = await this.userRepository.findOne({
            where: { email: email },
            relations: ['roles']
        });

        if (!userFound) {
            throw new HttpException('El email no esta registrado', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await compare(password, userFound.password);

        if (!isPasswordValid) {
            throw new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
        }

        const rolesIds = userFound.roles.map(rol => rol.id); // solo lso ids [WORKER, ADMIN]

        const payload = { id: userFound.id, name: userFound.name, roles: rolesIds };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userFound,
            token: 'Bearer ' + token
        }

        delete data.user.password;

        return data;
    }
}

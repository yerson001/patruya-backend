import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { use } from 'passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { getFileValidator } from 'src/utils/image-file.validator';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Post() // http://localhost:3000/users
    createUser(@Body() userData: CreateUserDto) {
        return this.usersService.create(userData);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id') // http://localhost:3000/users/:id
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: UpdateUserDto) {
        return this.usersService.update(id, userData);
    }

    @UseGuards(JwtAuthGuard)
    @Put('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadWithImage(
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
            //new FileTypeValidator({ fileType: /^image/ }),
          ],
        }),
        getFileValidator(),
      )
      file: Express.Multer.File,@Param('id',ParseIntPipe) id:number,@Body() user:UpdateUserDto) {
      //console.log(file);
      return this.usersService.updateWithImage(file,id,user);
    }
}

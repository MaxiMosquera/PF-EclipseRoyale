import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags("users")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Get()
    getUsers(){
        return this.usersService.getUsers()
        //return "Proximamente lista de usuarios"
    }

}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
    getUsers(){
        return "Proximamente lista de usuarios!"
    }
}
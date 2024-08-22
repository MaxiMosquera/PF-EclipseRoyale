import { IsEnum, IsNotEmpty } from "class-validator";
import { Role, Status } from "src/enum/user.enums";

export class UpdateUserDto {

    
    name: string;
    email: string;
    password: string;
    oldPassword: string;
    adress: string;
    @IsEnum(Role)
    role: Role;
    phone: number;
    image?: string;
    @IsEnum(Status)
    status?: Status
}
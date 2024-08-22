import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role, Status } from "src/enum/user.enums";

export class UpdateUserDto {

    @ApiProperty({ type: String, description: 'User name' })
    @IsString()
    name: string;

    @ApiProperty({ type: String, description: 'User email' })
    @IsString()
    email: string;

    @ApiProperty({ type: String, description: 'User password' })
    @IsString()
    password: string;

    @ApiProperty({ type: String, description: 'User old password' })
    @IsString()
    oldPassword: string;

    @ApiProperty({ type: String, description: 'User adress' })
    adress: string;

    @ApiProperty({ description: 'User role' })
    @IsEnum(Role)
    role: Role;

    @ApiProperty({ type: Number, description: 'User phone' })
    @IsNumber( )
    phone: number;

    @ApiProperty({ type: String, description: 'User image' })
    @IsOptional()
    image?: string;

    @ApiProperty({ description: 'User status' })
    @IsEnum(Status)
    status?: Status
}
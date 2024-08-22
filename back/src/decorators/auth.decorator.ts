import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { CredentialsDto } from "src/dtos/credentials.dto"
import { LoginResponseDto } from "src/dtos/loginResponse.dto"
import { CreateUserDto } from "src/dtos/user.dtos"
import { User } from "src/entities/user.entity"


export const RegisterSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new account',
            description: 'Gets by body the information needed to create a new account.'
        }),
        ApiBody({
            type: CreateUserDto
        }),
        ApiResponse({
            status: 201,
            description: 'Created',
            type: User
        })
    )
}

export const LoginSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Logs into an already existing account',
            description: 'Gets by body username and password.'
        }),
        ApiBody({
            type: CredentialsDto
        }),
        ApiResponse({
            status: 201,
            description: 'Created',
            type: LoginResponseDto
        })
    )
}
import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateUserDto } from "src/dtos/updateuser.dto";


export const getAllUsersSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Get all users',
            description: 'Get all users from the database',
        }),
    );
}

export const GetUserByIdSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get user by ID', description: 'Receives the ID of a user as a parameter and returns an object with all their data.'})
    )
}

export const UpdateUserSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Updates a user', description: 'Receives the ID of a user as a parameter and the information to update their data in the body.'}),
        ApiBody({type: UpdateUserDto})
    )
}

export const DeleteUserSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Delete user', description: 'Receives the ID of a user as a parameter and changes their status to inactive in the database.'}),
        ApiResponse({status: 200, description: 'User deleted'})
    )
}


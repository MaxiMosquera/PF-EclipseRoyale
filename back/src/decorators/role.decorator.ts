import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enum/user.enums';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

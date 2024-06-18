import { Role } from '@prisma/client';

export class UserDto {
  id: string;

  name: string;

  email: string;

  password?: string;

  cellphone: string;

  cpf: string;

  role: Role;

  createdAt: Date;

  updatedAt: Date;
}

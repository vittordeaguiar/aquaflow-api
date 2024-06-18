import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  cellphone?: string;

  @IsNotEmpty()
  cpf: string;

  gender?: string;

  role: Role;

  createdAt: Date;

  updatedAt: Date;
}

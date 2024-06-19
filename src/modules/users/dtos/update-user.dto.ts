import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  cellphone?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

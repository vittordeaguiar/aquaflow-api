import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersInterface } from './users.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService implements UsersInterface {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cellphone: true,
        cpf: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getById(id: string): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        cellphone: true,
        cpf: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(data: CreateUserDto): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: { cpf: data.cpf },
    });
    if (existingUser) {
      throw new ConflictException('Este CPF já está cadastrado.');
    }
    await this.prisma.user.create({ data });
  }

  // TODO: corrigir função de alteração
  async update(id: string, user: UserDto): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        ...user,
      },
    });
  }

  // TODO: implementar função de deletar
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

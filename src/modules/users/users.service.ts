import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersInterface } from './users.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

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
    if (existingUser) throw new ConflictException('CPF já foi cadastrado.');
    await this.prisma.user.create({ data });
  }

  async verifyExistingUser(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  async update(id: string, user: UpdateUserDto): Promise<void> {
    await this.verifyExistingUser(id);

    // Remove undefined properties from user object to avoid updating them in the database
    const updatedUserData = Object.keys(user).reduce((acc, key) => {
      if (user[key] !== undefined) acc[key] = user[key];
      return acc;
    }, {});

    await this.prisma.user.update({
      where: { id },
      data: updatedUserData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.verifyExistingUser(id);
    await this.prisma.$transaction([
      this.prisma.invoice.deleteMany({ where: { userId: id } }),
      this.prisma.user.delete({ where: { id } }),
    ]);
  }
}

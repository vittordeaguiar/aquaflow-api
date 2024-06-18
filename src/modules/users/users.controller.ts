import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UsersInterface } from './users.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { SuccessResponse } from '../../decorators/success-response.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersInterface: UsersInterface) {}

  @Get()
  @SuccessResponse('Usuários encontrados com sucesso')
  async getUsers(): Promise<UserDto[]> {
    return await this.usersInterface.getAll();
  }

  @Get(':id')
  @SuccessResponse('Usuário encontrado com sucesso.')
  async getById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersInterface.getById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  @SuccessResponse('Usuário criado com sucesso.')
  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.usersInterface.create(body);
  }

  @SuccessResponse('Usuário deletado com sucesso.')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UserDto) {
    await this.usersInterface.update(id, body);
    return { message: 'Usuário atualizado!' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersInterface.delete(id);
    return { message: 'Usuário deletado!' };
  }
}

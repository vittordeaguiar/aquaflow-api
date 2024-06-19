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
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersInterface) {}

  @Get()
  @SuccessResponse('Usuários encontrados')
  async getUsers(): Promise<UserDto[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  @SuccessResponse('Usuário encontrado.')
  async getById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.getById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  @SuccessResponse('Usuário criado.')
  @Post()
  async create(@Body() body: CreateUserDto): Promise<void> {
    await this.usersService.create(body);
  }

  @SuccessResponse('Usuário alterado.')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    await this.usersService.update(id, body);
  }

  @SuccessResponse('Usuário deletado.')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() body: { email: string; password: string; name?: string },
  ) {
    return this.userService.createUser(body.email, body.password, body.name);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }
}

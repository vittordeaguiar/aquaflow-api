import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';

export abstract class UsersInterface {
  abstract getAll(): Promise<UserDto[]>;
  abstract getById(id: string): Promise<UserDto | undefined>;
  abstract create(user: CreateUserDto): Promise<void>;
  abstract update(id: string, user: UserDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

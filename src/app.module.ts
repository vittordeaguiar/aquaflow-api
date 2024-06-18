import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { APP_PIPE } from '@nestjs/core';
import { UsersService } from './modules/users/users.service';
import { UsersInterface } from './modules/users/users.interface';

@Module({
  imports: [UsersModule],
  controllers: [UsersController, AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: UsersInterface,
      useClass: UsersService,
    },
  ],
})
export class AppModule {}

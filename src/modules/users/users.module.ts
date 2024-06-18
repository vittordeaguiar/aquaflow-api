import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';

@Module({ providers: [PrismaService] })
export class UsersModule {}

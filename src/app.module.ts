import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoice } from './invoice/invoice.entity';
import { AddressModule } from './address/address.module';
import { Address } from './address/address.entity';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'vittordeaguiar',
      password: 'vittor.2022',
      database: 'pocoartesiano_db',
      entities: [User, Invoice, Address],
      synchronize: true, // apenas para desenvolvimento, em produção use migrações
    }),
    TypeOrmModule.forFeature([User, Invoice, Address]),
    UserModule,
    InvoiceModule,
    AddressModule,
    HealthModule,
  ],
})
export class AppModule {}

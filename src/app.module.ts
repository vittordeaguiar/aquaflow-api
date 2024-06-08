import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { Invoice } from './modules/invoice/invoice.entity';
import { AddressModule } from './modules/address/address.module';
import { Address } from './modules/address/address.entity';

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
  ],
})
export class AppModule {}

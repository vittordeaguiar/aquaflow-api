import { DataSource } from 'typeorm';
import { User } from './modules/user/user.entity';
import { Invoice } from './modules/invoice/invoice.entity';
import { Address } from './modules/address/address.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'vittordeaguiar',
  password: 'vittor.2022',
  database: 'pocoartesiano_db',
  entities: [User, Invoice, Address],
  synchronize: true, // Apenas para desenvolvimento, em produção use migrações
});

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// TODO: Corrigir imports
import { Address } from '../address/address.entity';
import { Invoice } from '../invoice/invoice.entity';
import { Role } from '../common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  cellphone: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true, nullable: true })
  rg: string;

  @Column({ nullable: true })
  civilState: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  addressId: string;

  @ManyToOne(() => Address, (address) => address.users, { nullable: true })
  address: Address;

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

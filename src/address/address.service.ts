import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createAddress(
    street: string,
    number: string,
    city: string,
    state: string,
    zipcode: string,
    neighborhood: string,
    complement?: string,
  ) {
    const address = this.addressRepository.create({
      street,
      number,
      city,
      state,
      zipcode,
      neighborhood,
      complement,
    });
    return this.addressRepository.save(address);
  }

  async getAllAddresses() {
    return this.addressRepository.find();
  }
}

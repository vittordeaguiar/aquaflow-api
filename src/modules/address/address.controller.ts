import { Controller, Get, Post, Body } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Body()
    body: {
      street: string;
      number: string;
      city: string;
      state: string;
      zipcode: string;
      neighborhood: string;
      complement?: string;
    },
  ) {
    return this.addressService.createAddress(
      body.street,
      body.number,
      body.city,
      body.state,
      body.zipcode,
      body.neighborhood,
      body.complement,
    );
  }

  @Get()
  async getAllAddresses() {
    return this.addressService.getAllAddresses();
  }
}

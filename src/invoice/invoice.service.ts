import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  //   async create(invoice: Invoice) {
  //     const entity = this.invoiceRepository.create(invoice);
  //     return this.invoiceRepository.save(entity);
  //   }

  async createInvoice(
    userId: string,
    amount: number,
    status: string,
    dueDate: Date,
  ) {
    const invoice = this.invoiceRepository.create({
      userId,
      amount,
      status,
      dueDate,
    });
    return this.invoiceRepository.save(invoice);
  }

  async getAllInvoices() {
    return this.invoiceRepository.find();
  }
}

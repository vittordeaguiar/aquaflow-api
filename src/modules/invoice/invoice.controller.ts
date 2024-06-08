import { Controller, Get, Post, Body } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async create(
    @Body()
    body: {
      userId: string;
      amount: number;
      status: string;
      dueDate: Date;
    },
  ) {
    return this.invoiceService.createInvoice(
      body.userId,
      body.amount,
      body.status,
      body.dueDate,
    );
  }

  @Get()
  async getAllInvoices() {
    return this.invoiceService.getAllInvoices();
  }
}

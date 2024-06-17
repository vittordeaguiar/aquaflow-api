import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  async checkDatabaseConnection(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1');
      return 'up';
    } catch (error) {
      return 'down';
    }
  }
}

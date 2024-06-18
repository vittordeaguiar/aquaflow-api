import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const message = this.reflector.get<string>(
          'successMessage',
          context.getHandler(),
        );
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: message || 'Sucesso',
          data,
        };
      }),
    );
  }
}

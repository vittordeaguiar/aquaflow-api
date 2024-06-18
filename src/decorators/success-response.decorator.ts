import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { SuccessResponseInterceptor } from './success-response.interceptor';

export function SuccessResponse(message?: string) {
  return applyDecorators(
    SetMetadata('successMessage', message), // metadado da imagem
    UseInterceptors(SuccessResponseInterceptor), // aplica o interceptor
  );
}

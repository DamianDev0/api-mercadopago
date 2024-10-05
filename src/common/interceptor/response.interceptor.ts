import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();
  
      return next.handle().pipe(
        map((data) => ({
          code: response.statusCode,
          message: this.getMessageForStatusCode(response.statusCode),
          data,
        })),
      );
    }
  
    private getMessageForStatusCode(statusCode: number): string {
      switch (statusCode) {
        case 200:
          return 'Data retrieved successfully';
        case 201:
          return 'Resource created successfully';
        case 204:
          return 'Resource deleted successfully, no content to return';
        case 202:
          return 'Request accepted and is being processed';
        case 203:
          return 'Non-authoritative information provided';
        case 404:
          return 'The requested resource could not be found';
        case 500:
          return 'Internal server error occurred, please try again later';
        default:
          return 'Unexpected error occurred';
      }
    }
  }
  
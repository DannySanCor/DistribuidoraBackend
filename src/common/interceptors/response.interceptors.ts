import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '../traslate/translate.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private LANG = 'es';
  private translateService: TranslateService = new TranslateService();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: this.getMessage(request.method),
        data: data,
        timestamp: new Date().toISOString(),
      })),
    );
  }

  getMessage(methodHttp) {
    switch (methodHttp) {
      case 'POST':
        return this.translateService.get(this.LANG, 'GENERALS.SAVE_SUCCESS');
        break;
      case 'GET':
        return this.translateService.get(this.LANG, 'GENERALS.GET_SUCCESS');
        break;
      case 'PUT':
        return this.translateService.get(this.LANG, 'GENERALS.PUT_SUCCESS');
        break;
      case 'DELETE':
        return this.translateService.get(this.LANG, 'GENERALS.DELETE_SUCCESS');
        break;
    }
  }
}

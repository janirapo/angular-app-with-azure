import { HttpErrorHandlerService } from './http-error-handler/http-error-handler.service';
import { MessageService } from './message/message.service';

export const services: any[] = [HttpErrorHandlerService, MessageService];

export * from './http-error-handler/http-error-handler.service';
export * from './message/message.service';

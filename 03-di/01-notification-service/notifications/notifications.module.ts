import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule } from '../logger/logger.module';
import { NotificationsService } from "./notifications.service";
import { NotificationOptions } from './notifications.interface';

@Module({
  imports: [LoggerModule],
  providers: [
    {

      provide: 'NOTIFICATION_OPTIONS',
      useValue: {
        senderEmail: 'default sender',
        smsGateway: 'default gateway',
      },
    },
    NotificationsService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {
  static forRoot(options: NotificationOptions): DynamicModule {
    return {
      module: NotificationsModule,
      providers: [
        {
          provide: 'NOTIFICATION_OPTIONS',
          useValue: options,
        },
        NotificationsService
      ],
      exports: [NotificationsService],
    }
  }
}

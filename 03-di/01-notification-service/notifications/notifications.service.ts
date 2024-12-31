import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { LoggerService } from '../logger/logger.service';
import { NotificationOptions } from './notifications.interface';

@Injectable()
export class NotificationsService {
  constructor(private readonly loggerService: LoggerService, @Inject('NOTIFICATION_OPTIONS') private options: NotificationOptions) {}

  sendEmail(to: string, subject: string, message: string) {
    if (!to) {
      throw new BadRequestException('')
    }

    this.loggerService.log(`Email sent to ${to} from ${this.options.senderEmail}: [${subject}], ${message}`);
  }

  sendSMS(to: string, message: string) {
    if (!to) {
      throw new BadRequestException('')
    }

    this.loggerService.log(`SMS sent to ${to} from ${this.options.smsGateway}: ${message}`);
  }
}

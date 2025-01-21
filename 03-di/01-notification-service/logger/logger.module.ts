import { Module, OnModuleInit } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  exports: [LoggerService],
  providers: [LoggerService]
})
export class LoggerModule implements OnModuleInit {
  constructor(private readonly loggerService: LoggerService) {}

  onModuleInit() {
    this.loggerService.initLogFile();
  }
}
import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { existsSync, writeFileSync } from 'node:fs';
import { appendFile } from 'node:fs/promises';

@Injectable()
export class LoggerService {
  private readonly logSource: string;

  constructor() {
    this.logSource = join(__dirname, 'logs.txt');
    console.log(this.logSource);
  }

  initLogFile() {
    try {
      if (!existsSync(this.logSource)) {
        writeFileSync(this.logSource, '');
        console.log('Log file created');
      } else {
        console.log('Log file already exists.');
      }
    
    } catch (error) {
      console.error('Error initializing log file:', error);
    }
  }

  log(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
  
    appendFile(this.logSource, logMessage)
      .then(() => {
        console.log(message);
      })
      .catch((error) => {
        console.log('Error writing to log file: ', error);
      })
  }
}
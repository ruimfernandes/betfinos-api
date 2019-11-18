import { createLogger, format, transports } from 'winston';
import { development } from './';

const { combine, colorize, printf } = format;

const timestamp = () => new Date().toLocaleTimeString();

const formatTemplate = printf(info => {
  return `${timestamp()} ${info.level}: ${info.message}`;
});

export const logger = createLogger({
  level: development() ? 'debug' : 'info',
  format: combine(colorize(), formatTemplate),
  transports: [new transports.Console()],
  exitOnError: false,
});

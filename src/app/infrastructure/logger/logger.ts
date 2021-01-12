import { createLogger, transports, format, Logger } from 'winston';

export default function makeLogger(): Logger {
  const logger = createLogger({
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.printf((info) => {
        const { timestamp, level, message, ...args } = info;
        return `${timestamp} ${level}: ${message} ${
          Object.keys(args).length ? JSON.stringify(args) : ''
        }`;
      })
    )
  });

  if (process.env.NODE_ENV !== 'test') {
    logger.add(new transports.Console());
  }

  if (process.env.NODE_ENV === 'test') {
    logger.add(
      new transports.File({
        filename: './logs/test-logs.log'
      })
    );
  }

  return logger;
}

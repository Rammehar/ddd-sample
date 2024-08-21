import { createLogger, transports, format } from "winston";
import { isProduction } from "../../config";

const devLogger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] ${level}: ${stack || message}`;
    })
  ),
  transports: [new transports.Console()],
});

const prodLogger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: {
    service: "Skill Risers",
  },
  transports: [
    new transports.File({
      filename: "logs/errors.log",
      level: "error",
      maxsize: 209715, // 20/100 MB
      maxFiles: 50,
    }),
    new transports.File({
      filename: "logs/combined.log",
      maxsize: 209715,
      maxFiles: 50,
    }),
  ],
});

const logger = isProduction ? prodLogger : devLogger;
export { logger };

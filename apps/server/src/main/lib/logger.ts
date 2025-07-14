import winston from "winston";

const level = "debug";
const colorizer = winston.format.colorize();

export const logger = winston.createLogger({
  level: level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf((msg) =>
      colorizer.colorize(
        msg.level,
        `${msg.timestamp} - ${msg.level}: ${msg.message}`,
      ),
    ),
  ),
  transports: [new winston.transports.Console()],
});

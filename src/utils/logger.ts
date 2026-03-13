import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import config from '../config'

const LogLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const logger = winston.createLogger({
    levels: LogLevels,
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        winston.format.printf(
            ({ timestamp, level, message, logMetadata, stack }) => {
                return `${timestamp} ${level}: ${logMetadata || ''} ${message} ${stack || ''}`
            }
        ),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),

        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    ({ timestamp, level, message, logMetadata, stack }) => {
                        return `${timestamp} ${level}: ${logMetadata || ''} ${message} ${stack || ''}`
                    }
                )
            )
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    ({ timestamp, level, message, logMetadata, stack }) => {
                        return `${timestamp} ${level}: ${logMetadata || ''} ${message} ${stack || ''}`
                    }
                )
            )
        })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    ({ timestamp, level, message, logMetadata, stack }) => {
                        return `${timestamp} ${level}: ${logMetadata || ''} ${message} ${stack || ''}`
                    }
                )
            )
        })
    ]
})

const fileRotateTransport = new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'debug',
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
    )
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console())
}
logger.add(fileRotateTransport)

export default logger

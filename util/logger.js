const winston = require("winston");

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize({
                            all: true
                        }),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({filename: 'combined.log'})
            ]
        });
    }
}

module.exports = new Logger();
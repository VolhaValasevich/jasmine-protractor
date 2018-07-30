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
                    ),
                    level: "debug"
                }),
                new winston.transports.File({filename: 'combined.log'})
            ]
        });
    }
}

module.exports = new Logger();
const winston = require("winston");

const myCustomLevels = {
    levels: {
        fail: 0,
        start: 1,
        info: 2,
        finish: 3
    },
    colors: {
        fail: 'red',
        start: 'yellow',
        info: 'white',
        finish: 'green'
    }
};

winston.addColors(myCustomLevels.colors);

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            levels: myCustomLevels.levels,
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize({
                            all: true
                        }),
                        winston.format.simple()
                    ),
                    level: "finish"
                }),
                new winston.transports.File({filename: 'combined.log'})
            ]
        });
    }
}

module.exports = new Logger();
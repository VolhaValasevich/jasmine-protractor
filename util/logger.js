const {createLogger, format, transports, addColors} = require('winston');
const {combine, timestamp, label, printf} = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

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

addColors(myCustomLevels.colors);

class Logger {
    constructor() {
        this.logger = createLogger({
            levels: myCustomLevels.levels,
            transports: [
                new transports.Console({
                    format: combine(
                        label({label: 't-mobile.com'}),
                        timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                        format.colorize({
                            all: true
                        }),
                        myFormat
                    ),
                    level: "finish"
                }),
                new transports.File({filename: 'combined.log', format: format.simple(), level: "finish"})
            ]
        });
    }
}

module.exports = new Logger();
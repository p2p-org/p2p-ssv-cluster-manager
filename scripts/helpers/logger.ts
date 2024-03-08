import log4js from "log4js";

log4js.configure({
    appenders: {
        file: { type: "file", filename: 'logs.txt' },
        console: {
            type: 'console'
        } },
    categories: { default: { appenders: ['console', "file"], level: "info" } },
});

export const logger = log4js.getLogger();

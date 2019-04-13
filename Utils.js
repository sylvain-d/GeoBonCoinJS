//File for utils to use everywhere
const chalk = require('chalk');

const utilsExports = module.exports = {};

/** Logger function with log level, Debug by default
 * @param {object} dataToLog what to log
 * @param {string} logLevel to specify a log level, DEBUG|INFO|WARN
 */
function logger(level, ...args) {
    var args = Array.prototype.slice.call(arguments);

    switch (level) {
        case "DEBUG":
            args[0] = chalk.bgCyan("[" + level + "]\t");
            break;
        case "INFO":
            args[0] = chalk.bgGreen("[" + level + "]\t");
            break;
        case "WARN":
            args[0] = chalk.bgRed("[" + level + "]\t");
            break;
        case "ERROR":
            args[0] = chalk.bgMagenta("[" + level + "]\t");
            break;
        default:
            args[0] = chalk.gray("[" + args[0] + "]\t")

    };
    console.log.apply(console, args)

};




/**
 * logger with 3 levels, WARN, INFO, DEBUG
 * 
 * usage log.warn(dataToLog)
 */
utilsExports.log = {
    WARN: function (...args) {
        logger("WARN", ...args);
    },
    INFO: function (...args) {
        logger("INFO", ...args);
    },
    DEBUG: function (...args) {
        logger("DEBUG", ...args);
    },
    ERROR: function (...args) {
        logger("ERROR", ...args);
    }

};
/**
 * USELESS, POC ONLY
 * 
 * POC for exports, works as function or object
 * 
 * with util = require('./Utils.js') util.functionOrObj(data) log data
 * 
 * with myObj = new util.functionOrObj() works like anb obj and we could call myObj.myInnerFunction(otherData)
 * @param  {} data if used with a require, log data
 */
utilsExports.functionOrObj = function (data) {
    console.log("data =", data);

    this.myInnerFunction = function (otherData) {
        console.log('Other data=', otherData);
    }

}


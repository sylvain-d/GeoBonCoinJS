//File for utils to use everywhere
const chalk = require('chalk');

var utilsExports = module.exports = {};

/** Logger function with log level, Debug by default
 * @param {object} dataToLog - what to log
 * @param {string} logLevel - to specify a log level, DEBUG|INFO|WARN
 */
utilsExports.logger = function (dataToLog,level){
    switch(level){
        case "DEBUG" : 
            console.log(chalk.blue("["+level+"]\t"),dataToLog);
            break;
        case "INFO" : 
            console.log(chalk.green("["+level+"]\t"),dataToLog);
            break;
        case "WARN" :
            console.log(chalk.red("["+level+"]\t"),dataToLog);
            break;
        default :
            console.log(chalk.gray("logger : "),dataToLog);
         
    }
    
   

};



const { createLogger, format, transports } = require('winston');

// Import mongodb
///require('winston-mongodb');

module.exports = createLogger({
transports:[
    new transports.File({
    filename: 'logs/server.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),

    // // MongoDB transport
    // new transports.MongoDB({
    //     level: 'error',
    //     //mongo database connection link
    //     db : 'mongodb://localhost:27017/logs',
    //     options: {
    //         useUnifiedTopology: true
    //     },
    //     // A collection to save json formatted logs
    //     collection: 'server_logs',
    //     format: format.combine(
    //     format.timestamp(),
    //     // Convert logs to a json format
    //     format.json())
    // })
  ]
});


// const options = {
//     file: {
//       level: 'info',
//       filename: './logs/app.log',
//       handleExceptions: true,
//       json: true,
//       maxsize: 5242880, // 5MB
//       maxFiles: 5,
//       colorize: false,
//     },
//     console: {
//       level: 'debug',
//       handleExceptions: true,
//       json: false,
//       colorize: true,
//     },
//   };
  
//   const logger = winston.createLogger({
//     levels: winston.config.npm.levels,
//     transports: [
//       new winston.transports.File(options.file),
//       new winston.transports.Console(options.console)
//     ],
//     exitOnError: false
//   })



//   var winston = require('winston');
//   require('winston-daily-rotate-file');

//   var transport = new winston.transports.DailyRotateFile({
//     filename: 'application-%DATE%.log',
//     datePattern: 'YYYY-MM-DD-HH',
//     zippedArchive: true,
//     maxSize: '20m',
//     maxFiles: '14d'
//   });

//   transport.on('rotate', function(oldFilename, newFilename) {
//     // do something fun
//   });

//   var logger = winston.createLogger({
//     transports: [
//       transport
//     ]
//   });

//   logger.info('Hello World!');
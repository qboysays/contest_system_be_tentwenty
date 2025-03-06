const winston = require("winston");
require("winston-daily-rotate-file");
const momentTimezone = require("moment-timezone");

class LoggerModel {
  constructor(reqUrl, requestID) {
    this.ReqUrl = reqUrl;
    this.Message = null;
    this.TimeStamp = null;
    this.RequestID = requestID;
    this.logInfo = function (message) {
      this.Message = message;
      this.TimeStamp = momentTimezone
        .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss");
      Logger(this.ReqUrl, this.Message, this.TimeStamp, this.RequestID);
    };
  }
}

function Logger(apiUrl, message, timeStamp, requestID) {
  let transport = new winston.transports.DailyRotateFile({
    filename: "./Logs/applog-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "50m",
  });

  let logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [transport],
  });

  const logString =
    "===> TimeStamp : " +
    timeStamp +
    "===> API : " +
    apiUrl +
    " ===> RequestID : " +
    requestID +
    " ===> Message : " +
    message;

  logger.info(logString);
}

module.exports.LoggerModel = LoggerModel;

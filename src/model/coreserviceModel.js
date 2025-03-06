var momentTimezone = require("moment-timezone");
var appLib = require("applib");
const { v4: uuid } = require('uuid');
var constant = require("../common/constant");


class functionContext {
  constructor(requestType, res, logger) {
    (this.requestType = requestType),
      (this.requestID = res.apiContext.requestID),
      (this.userRef = res.apiContext.userRef),
      (this.userType = res.apiContext.userType),
      (this.res = res),
      (this.logger = logger),
      (this.currentTs = momentTimezone
        .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
        .tz("Asia/Dubai")
        .format("YYYY-MM-DD HH:mm:ss"));
  }
}

class apiContext {
  constructor(requestID, mailer) {
    (this.requestID = requestID),
      (this.userRef = null),
      (this.userType = null),
      (this.userID = null),
      (this.currentTs = momentTimezone
        .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
        .tz("Asia/Dubai")
        .format("YYYY-MM-DD HH:mm:ss"));
  }
}

class errorModel {
  constructor(errorMessage, errorCode, errorDescription) {
    this.ErrorCode = errorCode;
    this.ErrorMessage = `Error! ${errorMessage}`;
    this.ErrorDescription = errorDescription;
  }
}

class validateRequest {
  constructor(req) {
    (this.apiUri = req.path),
      (this.authToken = req.headers.authtoken),
      (this.authorization = req.headers.authorization)
  }
}

class validateResponse {
  constructor() {
    (this.Error = null), (this.RequestID = null), (this.Details = null);
  }
}


module.exports.ErrorModel = errorModel;
module.exports.ValidateRequest = validateRequest;
module.exports.ValidateResponse = validateResponse;
module.exports.FunctionContext = functionContext;
module.exports.ApiContext = apiContext;
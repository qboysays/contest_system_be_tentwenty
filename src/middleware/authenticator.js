const appLib = require("applib");
const { v4: uuid } = require('uuid');
const databaseHelper = require("../helper/databasehelper");
const coreRequestModel = require("../model/coreserviceModel");
const settings = require("../common/settings").Settings;
const constant = require("../common/constant");
const requestType = constant.RequestType;
const joiValidationModel = require("../model/validationModel");

exports.AuthenticateRequest = async function (req, res, next) {
  let requestID = uuid();
  let logger = new appLib.Logger(req.originalUrl, requestID);
  logger.logInfo(`AuthenticateRequest invoked()!`);

  let apiContext = new coreRequestModel.ApiContext(requestID);
  res.apiContext = apiContext;
  let functionContext = new coreRequestModel.FunctionContext(
    requestType.AUTHENTICATEREQUEST,
    null,
    res,
    logger
  );
  let validateRequest = new coreRequestModel.ValidateRequest(req);
  let validateResponse = new coreRequestModel.ValidateResponse(req);
  let validateAPIRequest = joiValidationModel.validateRequest(validateRequest);

  validateResponse.RequestID = requestID;

  if (validateAPIRequest.error) {
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.Invalid_Request,
      constant.ErrorCode.Invalid_Request
    );
    logger.logInfo(
      `AuthenticateRequest() Error:: Invalid Request :: ${JSON.stringify(
        validateRequest
      )}`
    );

    validateResponse.Error = functionContext.error;
    appLib.SendHttpResponse(functionContext, validateResponse);
    return;
  }

  let authenticationResult = authentication(functionContext);

  if (validateRequest.authorization != authenticationResult.basicAuth) {
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.Invalid_Authentication,
      constant.ErrorCode.Invalid_Authentication
    );
    logger.logInfo(
      `AuthenticateRequest() Error:: Invalid Authentication :: ${JSON.stringify(
        validateRequest
      )}`
    );
    validateResponse.Error = functionContext.error;
    appLib.SendHttpResponse(functionContext, validateResponse);
    return;
  }
  try {
    let validateRequestResult = await databaseHelper.validateRequest(
      functionContext,
      validateRequest
    );
    apiContext.userRole = validateRequestResult.UserRole;
    apiContext.userRef = validateRequestResult.UserRef;
    apiContext.userID = validateRequestResult.UserID;

    res.apiContext = apiContext;
    next();
  } catch (errValidateRequest) {
    if (!errValidateRequest.ErrorMessage && !errValidateRequest.ErrorCode) {
      logger.logInfo(`AuthenticateRequest() :: Error :: ${errValidateRequest}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }
    logger.logInfo(
      `AuthenticateRequest() :: Error :: ${JSON.stringify(errValidateRequest)}`
    );
    validateResponse.Error = functionContext.error;
    appLib.SendHttpResponse(functionContext, validateResponse);
  }
};

let authentication = (functionContext) => {
  let logger = functionContext.logger;

  logger.logInfo(`authentication() Invoked! `);

  let basicAuth = new Buffer.from(
    settings.APP_KEY + ":" + settings.APP_SECRET
  ).toString("base64");

  return {
    basicAuth: basicAuth,
  };
};

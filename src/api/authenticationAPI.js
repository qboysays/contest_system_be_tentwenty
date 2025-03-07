const databaseHelper = require("../helper/databasehelper");
const coreRequestModel = require("../model/coreserviceModel");
const appLib = require("applib");
const settings = require("../common/settings").Settings;
const joiValidationModel = require("../model/validationModel");
const bcrypt = require("bcryptjs");
const constant = require("../common/constant");
const requestType = constant.RequestType;

module.exports.RegisterUser = async (req, res) => {
    var logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);
  
    logger.logInfo(`RegisterUser invoked()!!`);
  
    var functionContext = new coreRequestModel.FunctionContext(
      requestType.REGISTERUSER,
      null,
      res,
      logger
    );
  
    var registerUserRequest = new coreRequestModel.RegisterUserRequest(req);
  
    logger.logInfo(
      `RegisterUser() :: Request Object : ${registerUserRequest}`
    );
  
    var validateRequest = joiValidationModel.registerUserRequest(
      registerUserRequest
    );
  
    if (validateRequest.error) {
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.Invalid_Request,
        constant.ErrorCode.Invalid_Request,
        validateRequest.error.details
      );
      logger.logInfo(
        `RegisterUser() Error:: Invalid Request :: ${JSON.stringify(
          registerUserRequest
        )}`
      );
      registerUserResponse(functionContext, null);
      return;
    }
  
    let requestContext = {
      ...registerUserRequest,
      passwordHash: null,
    };
  
    try {
      await encryptPassword(functionContext, requestContext);

      let saveUserDBResult = await databaseHelper.registerAndSaveUserDB(
        functionContext,
        requestContext
      );
      registerUserResponse(functionContext, saveUserDBResult);
    } catch (errSaveUser) {
      if (!errSaveUser.ErrorMessage && !errSaveUser.ErrorCode) {
        logger.logInfo(`SaveUser() :: Error :: ${errSaveUser}`);
        functionContext.error = new coreRequestModel.ErrorModel(
          constant.ErrorMessage.ApplicationError,
          constant.ErrorCode.ApplicationError
        );
      }
      logger.logInfo(
        `saveUser() :: Error :: ${JSON.stringify(errSaveUser)}`
      );
      registerUserResponse(functionContext, null);
    }
  };
  

module.exports.UserLogin = async (req, res) => {
  var logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);

  logger.logInfo(`UserLogin invoked()!!`);

  var functionContext = new coreRequestModel.FunctionContext(
    requestType.USERLOGIN,
    null,
    res,
    logger
  );

  var UserLoginRequest = new coreRequestModel.UserLoginRequest(req);
  logger.logInfo(`UserLogin() :: Request Object : ${UserLoginRequest}`);

  var validateRequest = joiValidationModel.userLoginRequest(UserLoginRequest);

  if (validateRequest.error) {
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.Invalid_Request,
      constant.ErrorCode.Invalid_Request,
      validateRequest.error.details
    );
    logger.logInfo(
      `UserLogin() Error:: Invalid Request :: ${JSON.stringify(
        UserLoginRequest
      )}`
    );
    saveUserLoginResponse(functionContext, null);
    return;
  }

  var requestContext = {
    ...UserLoginRequest,
    passwordHash: null,
  };

  try {
    let fetchUserLoginDetailsResult = await databaseHelper.fetchUserLoginDetailsDB(
      functionContext,
      requestContext
    );

    await passwordAuthentication(
      functionContext,
      requestContext,
      fetchUserLoginDetailsResult
    );


    var UserLoginDBResult = await databaseHelper.userLoginDB(
      functionContext,
      requestContext
    );

    saveUserLoginResponse(functionContext, UserLoginDBResult);
  } catch (errUserLogin) {
    if (!errUserLogin.ErrorMessage && !errUserLogin.ErrorCode) {
      logger.logInfo(`UserLogin() :: Error :: ${errUserLogin}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }
    logger.logInfo(`UserLogin() :: Error :: ${JSON.stringify(errUserLogin)}`);
    saveUserLoginResponse(functionContext, null);
  }
};


const encryptPassword = async (functionContext, requestContext) => {
  var logger = functionContext.logger;

  logger.logInfo(`encryptPassword() Invoked!`);

  const hash = bcrypt.hashSync(
      `${requestContext.password}`,
      parseInt(settings.SALT)
  );
  requestContext.passwordHash = hash;

  return;
};

const registerUserResponse = (functionContext, resolvedResult) => {
  let logger = functionContext.logger;

  logger.logInfo(`registerUserResponse() invoked`);

  let registerUserResponse = new coreRequestModel.RegisterUserResponse();

  registerUserResponse.RequestID = functionContext.requestID;
  if (functionContext.error) {
    registerUserResponse.Error = functionContext.error;
    registerUserResponse.Details = null;
  } else {
    registerUserResponse.Error = null;
    registerUserResponse.Details.UserRef = resolvedResult.reference;
    registerUserResponse.Details.Name = resolvedResult.name;
    registerUserResponse.Details.Email = resolvedResult.email;
  }
  appLib.SendHttpResponse(functionContext, registerUserResponse);
  logger.logInfo(
    `registerUserResponse  Response :: ${JSON.stringify(
      registerUserResponse
    )}`
  );
  logger.logInfo(`registerUserResponse completed`);
};

const passwordAuthentication = async (
    functionContext,
    requestContext,
    resolvedResult
  ) => {
    let logger = functionContext.logger;
  
    logger.logInfo(`passwordAuthentication() invoked`);

    try {
        const result = bcrypt.compareSync(
          `${requestContext.password}`,
          resolvedResult.passwordHash
        );
        
        
        
          if (result) {
            logger.logInfo(`passwordAuthentication() :: Authentication Successful`);
        
            return;
          } else {
            logger.logInfo(`passwordAuthentication() :: Authentication Failed`);
        
            functionContext.error = new coreRequestModel.ErrorModel(
              constant.ErrorMessage.Invalid_User_Name_Or_Password,
              constant.ErrorCode.Invalid_User_Name_Or_Password
            );
        
            throw functionContext.error;
          }
    } catch (error) {
        console.log(error);
        
    }
  };

const saveUserLoginResponse = (functionContext, resolvedResult) => {
let logger = functionContext.logger;

logger.logInfo(`saveUserLoginResponse() invoked`);

let userLoginResponse = new coreRequestModel.UserLoginResponse();

userLoginResponse.RequestID = functionContext.requestID;
if (functionContext.error) {
userLoginResponse.Error = functionContext.error;
userLoginResponse.Details = null;
} else {
userLoginResponse.Error = null;
userLoginResponse.Details.AuthToken = resolvedResult.AuthToken;
userLoginResponse.Details.UserRef = resolvedResult.UserReference;
userLoginResponse.Details.UserRole = resolvedResult.UserRole;  

}
appLib.SendHttpResponse(functionContext, userLoginResponse);
logger.logInfo(
`saveUserLoginResponse  Response :: ${JSON.stringify(userLoginResponse)}`
);
logger.logInfo(`saveUserLoginResponse completed`);
};
 
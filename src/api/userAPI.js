const databaseHelper = require("../helper/databasehelper");
const coreRequestModel = require("../model/coreserviceModel");
const appLib = require("applib");
const constant = require("../common/constant");
const requestType = constant.RequestType;

module.exports.GetUserDetails = async (req, res) => {
    const logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);
  
    logger.logInfo(`GetUserDetails invoked()!!`);
  
  
    const functionContext = new coreRequestModel.FunctionContext(
      requestType.GETUSERDETAILS,
      null,
      res,
      logger
    );
  
    
    try {
      const getUserDetailsDBResult = await databaseHelper.getUserDetailsDB(
        functionContext  
      );
  
      getUserDetailsResponse(functionContext, getUserDetailsDBResult);
    } catch (errGetUserDetails) {
      functionContext.error = new coreRequestModel.ErrorModel(
        errGetUserDetails.ErrorMessage,
        errGetUserDetails.ErrorCode
      );
      logger.logInfo(
        `GetUserDetails() :: Error :: ${JSON.stringify(
          errGetUserDetails
        )
        }`
      );
      getUserDetailsResponse(functionContext, null);
    }
  };

/**
 * This function maps and sends response of get user details endpoint
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 */
const getUserDetailsResponse = (functionContext, resolvedResult) => {
let logger = functionContext.logger;

logger.logInfo(`getUserDetails Invoked()`);

let getUserDetails = new coreRequestModel.GetUserDetailsResponse();

getUserDetails.RequestID = functionContext.requestID;

if (functionContext.error) {
    getUserDetails.Error = functionContext.error;
    getUserDetails.Details = null;
} else {
    getUserDetails.Error = null;
    getUserDetails.Details.User = resolvedResult.user;
    getUserDetails.Details.Contests = resolvedResult.contests;
    getUserDetails.Details.History = resolvedResult.history;
}
appLib.SendHttpResponse(functionContext, getUserDetails);
logger.logInfo(
    `getUserDetails  Response :: ${JSON.stringify(getUserDetails)}`
);
logger.logInfo(`getUserDetails completed`);
};
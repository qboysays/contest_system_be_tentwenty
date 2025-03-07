const databaseHelper = require("../helper/databasehelper");
const coreRequestModel = require("../model/coreserviceModel");
const appLib = require("applib");
const settings = require("../common/settings").Settings;
const joiValidationModel = require("../model/validationModel");
const constant = require("../common/constant");
const requestType = constant.RequestType;

module.exports.GetContestList = async (req, res) => {
    var logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);
  
    logger.logInfo(`GetContestList invoked()!!`);
  
  
    var functionContext = new coreRequestModel.FunctionContext(
      requestType.GETCONTESTLIST,
      null,
      res,
      logger
    );
  
    
    try {
      var getContestListFromDBResult = await databaseHelper.getContestList(
        functionContext  
      );
  
      getContestListResponse(functionContext, getContestListFromDBResult);
    } catch (errGetContestList) {
      functionContext.error = new coreRequestModel.ErrorModel(
        errGetContestList.ErrorMessage,
        errGetContestList.ErrorCode
      );
      logger.logInfo(
        `GetContestList() :: Error :: ${JSON.stringify(
          errGetContestList
        )
        }`
      );
      getContestListResponse(functionContext, null);
    }
  };

module.exports.SaveContestDetails = async (req, res) => {
let logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);

logger.logInfo(`SaveContestDetails()`);

let functionContext = new coreRequestModel.FunctionContext(
    requestType.SAVECONTESTDETAILS,
    null,
    res,
    logger
    );
    
logger.logInfo(`SaveContestDetails() Request :: ${JSON.stringify(req.body)}`);

    
let saveContestDetailsRequest = new coreRequestModel.SaveContestRequest(req);


let validateRequest = joiValidationModel.saveContestRequest(saveContestDetailsRequest);

if (validateRequest.error) {
functionContext.error = new coreRequestModel.ErrorModel(
    constant.ErrorMessage.Invalid_Request,
    constant.ErrorCode.Invalid_Request,
    validateRequest.error.details
);
logger.logInfo(
    `saveContest() Error:: Invalid Request :: ${JSON.stringify(validateRequest)}`
);
saveContestResponse(functionContext, null);
return;
}

try {
    
    let saveContestDetailsResult = await databaseHelper.saveContestDB(
    functionContext,
    saveContestDetailsRequest
    );

    saveContestResponse(functionContext, saveContestDetailsResult);
} catch (errSaveContestDetails) {
    if (!errSaveContestDetails.ErrorMessage && !errSaveContestDetails.ErrorCode) {
    functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
    );
    }

    logger.logInfo(
    `saveContestResponse() :: Error :: ${JSON.stringify(errSaveContestDetails)}`
    );
    saveContestResponse(functionContext, null);
}
};

module.exports.GetContestDetails = async (req, res) => {
    var logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);
  
    logger.logInfo(`GetContestDetails invoked()!!`);
  
    let getContestRequest = new coreRequestModel.GetContestRequest(req);

     
    var functionContext = new coreRequestModel.FunctionContext(
        requestType.GETCONTESTDETAILS,
        null,
        res,
        logger
      );  

    let validateRequest = joiValidationModel.getContestRequest(getContestRequest);

    if (validateRequest.error) {
    functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.Invalid_Request,
        constant.ErrorCode.Invalid_Request,
        validateRequest.error.details
    );
    logger.logInfo(
        `GetContestDetails() Error:: Invalid Request :: ${JSON.stringify(validateRequest)}`
    );
    getContestResponse(functionContext, null);
    return;
    }
  
 
  
    try {
      var getContactDetailsDBResult = await databaseHelper.getContestDetailsDB(
        functionContext,
        getContestRequest.reference
      );
  
      getContestResponse(functionContext, getContactDetailsDBResult);
    } catch (errGetContestDetails) {
      functionContext.error = new coreRequestModel.ErrorModel(
        errGetContestDetails.ErrorMessage,
        errGetContestDetails.ErrorCode
      );
      logger.logInfo(
        `GetContestDetails() :: Error :: ${JSON.stringify(
          errGetContestDetails
        )}`
      );
      getContestResponse(functionContext, null);
    }
  };

const getContestListResponse = (functionContext, resolvedResult) => {
let logger = functionContext.logger;

logger.logInfo(`getContestListResponse Invoked()`);

let getContestListResponse = new coreRequestModel.ContestListResponse();

getContestListResponse.RequestID = functionContext.requestID;

if (functionContext.error) {
    getContestListResponse.Error = functionContext.error;
    getContestListResponse.Details = null;
} else {
    getContestListResponse.Error = null;
    getContestListResponse.Details = resolvedResult;
}
appLib.SendHttpResponse(functionContext, getContestListResponse);
logger.logInfo(
    `getContestListResponse  Response :: ${JSON.stringify(getContestListResponse)}`
);
logger.logInfo(`getContestListResponse completed`);
};

const saveContestResponse = (functionContext, resolvedResult) => {
let logger = functionContext.logger;

logger.logInfo(`saveContestResponse Invoked()`);

let saveContestResponse = new coreRequestModel.SaveContestResponse();

saveContestResponse.RequestID = functionContext.requestID;

if (functionContext.error) {
    saveContestResponse.Error = functionContext.error;
    saveContestResponse.Details = null;
} else {
    saveContestResponse.Details.ContestReference = resolvedResult.reference;
    saveContestResponse.Details.ContestName = resolvedResult.name;
    saveContestResponse.Details.Description = resolvedResult.description;
    saveContestResponse.Details.EndTime = resolvedResult.start_time;
    saveContestResponse.Details.StartTime = resolvedResult.end_time;
    saveContestResponse.Details.Prize = resolvedResult.prize;
    saveContestResponse.Error = null;
}
appLib.SendHttpResponse(functionContext, saveContestResponse);
logger.logInfo(
    `saveContestResponse  Response :: ${JSON.stringify(saveContestResponse)}`
);
logger.logInfo(`saveContestResponse completed`);
};

const getContestResponse = (functionContext, resolvedResult) => {
let logger = functionContext.logger;

logger.logInfo(`getContestResponse Invoked()`);

let getContestResponse = new coreRequestModel.GetContestResponse();

getContestResponse.RequestID = functionContext.requestID;

if (functionContext.error) {
    getContestResponse.Error = functionContext.error;
    getContestResponse.Details = null;
} else {
    getContestResponse.Error = null;
    getContestResponse.Details.ContestId = resolvedResult.id;
    getContestResponse.Details.ContestRef = resolvedResult.reference;
    getContestResponse.Details.ContestName = resolvedResult.name;
    getContestResponse.Details.Description = resolvedResult.description;
    getContestResponse.Details.StartTime = resolvedResult.start_time;
    getContestResponse.Details.EndTime = resolvedResult.end_time;
    getContestResponse.Details.Prize = resolvedResult.prize;
    getContestResponse.Details.IsActive = resolvedResult.isActive;
    getContestResponse.Details.CreatedAt = resolvedResult.createdAt;
    getContestResponse.Details.UpdatedAt = resolvedResult.updatedAt;
    getContestResponse.Details.Questions = resolvedResult.questions;
}
appLib.SendHttpResponse(functionContext, getContestResponse);
logger.logInfo(
    `getContestResponse  Response :: ${JSON.stringify(getContestResponse)}`
);
logger.logInfo(`getContestResponse completed`);
};
const databaseHelper = require("../helper/databasehelper");
const coreRequestModel = require("../model/coreserviceModel");
const appLib = require("applib");
const settings = require("../common/settings").Settings;
const joiValidationModel = require("../model/validationModel");
const constant = require("../common/constant");
const requestType = constant.RequestType;

module.exports.GetContestList = async (req, res) => {
    const logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);
  
    logger.logInfo(`GetContestList invoked()!!`);
  
  
    const functionContext = new coreRequestModel.FunctionContext(
      requestType.GETCONTESTLIST,
      null,
      res,
      logger
    );
  
    
    try {
      const getContestListFromDBResult = await databaseHelper.getContestList(
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
    const logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);
  
    logger.logInfo(`GetContestDetails invoked()!!`);
  
    let getContestRequest = new coreRequestModel.GetContestRequest(req);

     
    const functionContext = new coreRequestModel.FunctionContext(
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
      const getContactDetailsDBResult = await databaseHelper.getContestDetailsDB(
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

module.exports.JoinContest = async (req, res) => {
const logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);

logger.logInfo(`JoinContest invoked()!!`);

let joinContestRequest = new coreRequestModel.JoinContestRequest(req);

    
const functionContext = new coreRequestModel.FunctionContext(
    requestType.JOINCONTEST,
    null,
    res,
    logger
    );  

let validateRequest = joiValidationModel.joinContestRequest(joinContestRequest);

if (validateRequest.error) {
functionContext.error = new coreRequestModel.ErrorModel(
    constant.ErrorMessage.Invalid_Request,
    constant.ErrorCode.Invalid_Request,
    validateRequest.error.details
);
logger.logInfo(
    `JoinContest() Error:: Invalid Request :: ${JSON.stringify(validateRequest)}`
);
joinContestResponse(functionContext, null);
return;
}

try {
    const joinContestDBResult = await databaseHelper.joinContestDB(
    functionContext,
    joinContestRequest
    );

    joinContestResponse(functionContext, joinContestDBResult);
} catch (errJoinContest) {
    functionContext.error = new coreRequestModel.ErrorModel(
    errJoinContest.ErrorMessage,
    errJoinContest.ErrorCode
    );
    logger.logInfo(
    `errJoinContest() :: Error :: ${JSON.stringify(
        errJoinContest
    )}`
    );
    joinContestResponse(functionContext, null);
}
};

module.exports.SubmitContest = async (req, res) => {
    const logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);
    
    logger.logInfo(`SubmitContest invoked()!!`);
    
    let submitContestRequest = new coreRequestModel.SubmitContestRequest(req);
    
        
    const functionContext = new coreRequestModel.FunctionContext(
        requestType.SUBMITCONTEST,
        null,
        res,
        logger
        );  
    
    let validateRequest = joiValidationModel.submitContestRequest(submitContestRequest);
    
    if (validateRequest.error) {
    functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.Invalid_Request,
        constant.ErrorCode.Invalid_Request,
        validateRequest.error.details
    );
    logger.logInfo(
        `SubmitContest() Error:: Invalid Request :: ${JSON.stringify(validateRequest)}`
    );
    submitContestResponse(functionContext, null);
    return;
    }
    
    try {
        const submitContestDBResult = await databaseHelper.submitContestAnswersDB(
        functionContext,
        submitContestRequest
        );
    
        submitContestResponse(functionContext, submitContestDBResult);
    } catch (errSubmitContest) {
        functionContext.error = new coreRequestModel.ErrorModel(
        errSubmitContest.ErrorMessage,
        errSubmitContest.ErrorCode
        );
        logger.logInfo(
        `errSubmitContest() :: Error :: ${JSON.stringify(
            errSubmitContest
        )}`
        );
        submitContestResponse(functionContext, null);
    }
    };

module.exports.GetLeaderboard = async (req, res) => {
const logger = new appLib.Logger(req.originalUrl, res.apiContext.requestID);

logger.logInfo(`GetLeaderboard invoked()!!`);


const functionContext = new coreRequestModel.FunctionContext(
    requestType.GETLEADERBOARD,
    null,
    res,
    logger
);

let getLeaderboardRequest = new coreRequestModel.GetLeaderboardRequest(req);


let validateRequest = joiValidationModel.getLeaderboardRequest(getLeaderboardRequest);

if (validateRequest.error) {
functionContext.error = new coreRequestModel.ErrorModel(
    constant.ErrorMessage.Invalid_Request,
    constant.ErrorCode.Invalid_Request,
    validateRequest.error.details
);
logger.logInfo(
    `GetLeaderboard() Error:: Invalid Request :: ${JSON.stringify(validateRequest)}`
);
getContestLeaderboardResponse(functionContext, null);
return;
}


try {
    let getContestLeaderboardDBResult = await databaseHelper.getContestLeaderboardDB(
    functionContext,
    getLeaderboardRequest.contestRef
    );

    getContestLeaderboardResponse(functionContext, getContestLeaderboardDBResult);
} catch (errGetLeaderboard) {
    functionContext.error = new coreRequestModel.ErrorModel(
    errGetLeaderboard.ErrorMessage,
    errGetLeaderboard.ErrorCode
    );
    logger.logInfo(
    `GetLeaderboard() :: Error :: ${JSON.stringify(
        errGetLeaderboard
    )
    }`
    );
    getContestLeaderboardResponse(functionContext, null);
}
};

/**
 * This function maps and sends the response of get Contest list endpoint
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 */
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

/**
 * This function maps and sends the response of Save contest endpoint
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 */
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

/**
 * This function maps and sends the response of Get contest endpoint
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 */
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

/**
 * This function maps and sends the response of Join Contest endpoint
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 */
const joinContestResponse = (functionContext, resolvedResult) => {
    let logger = functionContext.logger;
    
    logger.logInfo(`joinContestResponse Invoked()`);
    
    let joinContestResponse = new coreRequestModel.JoinContestResponse();
    
    joinContestResponse.RequestID = functionContext.requestID;
    
    if (functionContext.error) {
        joinContestResponse.Error = functionContext.error;
        joinContestResponse.Details = null;
    } else {
        joinContestResponse.Error = null;
        joinContestResponse.Details.ContestRef = resolvedResult.reference,
        joinContestResponse.Details.Name = resolvedResult.name,
        joinContestResponse.Details.ContestType = resolvedResult.contestType,
        joinContestResponse.Details.StartTime = resolvedResult.startTime,
        joinContestResponse.Details.EndTime = resolvedResult.endTime
    }
    appLib.SendHttpResponse(functionContext, joinContestResponse);
    logger.logInfo(
        `joinContestResponse  Response :: ${JSON.stringify(joinContestResponse)}`
    );
    logger.logInfo(`joinContestResponse completed`);
    };

/**
 * This function maps and sends the response of Submit Contest endpoint
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 */
const submitContestResponse = (functionContext, resolvedResult) => {
    let logger = functionContext.logger;
    
    logger.logInfo(`submitContestResponse Invoked()`);
    
    let submitContestResponse = new coreRequestModel.SubmitContestResponse();
    
    submitContestResponse.RequestID = functionContext.requestID;
    
    if (functionContext.error) {
        submitContestResponse.Error = functionContext.error;
        submitContestResponse.Details = null;
    } else {
        submitContestResponse.Error = null;
        submitContestResponse.Details.ContestRef = resolvedResult.reference,
        submitContestResponse.Details.Name = resolvedResult.name,
        submitContestResponse.Details.SubmittedAnswers = resolvedResult.submittedAnswers,
        submitContestResponse.Details.TotalQuestions = resolvedResult.totalQuestions,
        submitContestResponse.Details.IsCompleted = resolvedResult.isCompleted
        submitContestResponse.Details.Score = resolvedResult.score
    }
    appLib.SendHttpResponse(functionContext, submitContestResponse);
    logger.logInfo(
        `submitContestResponse  Response :: ${JSON.stringify(submitContestResponse)}`
    );
    logger.logInfo(`submitContestResponse completed`);
    };

/**
 * This function maps and sends the response of Get Leaderboard endpoint
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 */
const getContestLeaderboardResponse = (functionContext, resolvedResult) => {
    let logger = functionContext.logger;
    
    logger.logInfo(`getContestListResponse Invoked()`);
    
    let getContestListResponse = new coreRequestModel.GetLeaderboardResponse();
    
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
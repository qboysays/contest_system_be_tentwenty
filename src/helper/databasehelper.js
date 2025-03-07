const databaseModule = require("../database/database");
const coreRequestModel = require("../model/coreserviceModel");
const constant = require("../common/constant");


module.exports.validateRequest = async (functionContext, resolvedResult) => {
    var logger = functionContext.logger;
    logger.logInfo("validateRequest() Invoked!");
  
    try {
      let result = await databaseModule.knex.raw(
        `CALL usp_validate_request('${resolvedResult.apiUri}','${resolvedResult.authToken}')`
      );
      logger.logInfo("validateRequest() :: Api validated Successfully");
      return result[0][0][0];
    } catch (errValidateRequest) {
      logger.logInfo(
        `validateRequest() :: Error :: ${JSON.stringify(errValidateRequest)}`
      );
      var errorCode = null;
      var errorMessage = null;
      var errorDescription = null;
  
      if (
        errValidateRequest.sqlState &&
        errValidateRequest.sqlState == constant.ErrorCode.Invalid_Request_Url
      ) {
        errorCode = constant.ErrorCode.Invalid_Request_Url;
        errorMessage = constant.ErrorMessage.Invalid_Request_Url;
      } else if (
        errValidateRequest.sqlState &&
        errValidateRequest.sqlState == constant.ErrorCode.Invalid_User_Credentials
      ) {
        errorCode = constant.ErrorCode.Invalid_User_Credentials;
        errorMessage = constant.ErrorMessage.Invalid_User_Credentials;
      } else if (
        errValidateRequest.sqlState &&
        errValidateRequest.sqlState == constant.ErrorCode.Access_Not_Granted
      ) {
        errorCode = constant.ErrorCode.Access_Not_Granted;
        errorMessage = constant.ErrorMessage.Access_Not_Granted;
      } else {
        errorCode = constant.ErrorCode.ApplicationError;
        errorMessage = constant.ErrorMessage.ApplicationError;
        errorDescription = errValidateRequest.message ? errValidateRequest.message : null
      }
      functionContext.error = new coreRequestModel.ErrorModel(
        errorMessage,
        errorCode,
        errorDescription
      );
      throw functionContext.error;
    }
  };

module.exports.registerAndSaveUserDB = async (functionContext, resolvedResult) => {
    var logger = functionContext.logger;
    logger.logInfo("saveUserDB() Invoked!");
    try {
      let rows = await databaseModule.knex.raw(
        "CALL usp_register_and_save_user_details(:userRef,:name,:email,:passwordHash,:paramRole,:isActive,:currentTs)",
        {
          userRef: resolvedResult.reference,
          name: resolvedResult.name,
          email: resolvedResult.email,
          passwordHash: resolvedResult.passwordHash,
          paramRole: resolvedResult.role,
          isActive: resolvedResult.isActive,
          currentTs: functionContext.currentTs,
        }
      );
  
      logger.logInfo(
        `registerAndSaveUserDB() :: Returned Result :: ${JSON.stringify(rows[0][0])}`
      );
      var result = rows[0][0][0] ? rows[0][0][0] : null;
      return result;
    } catch (errsaveUserDB) {
      logger.logInfo(
        `registerAndSaveUserDB() :: Error :: ${JSON.stringify(errsaveUserDB)}`
      );
      var errorCode = null;
      var errorMessage = null;
      if (
        errsaveUserDB.sqlState &&
        errsaveUserDB.sqlState == constant.ErrorCode.Invalid_User
      ) {
        errorCode = constant.ErrorCode.Invalid_User;
        errorMessage = constant.ErrorMessage.Invalid_User;
      } else if (
        errsaveUserDB.sqlState &&
        errsaveUserDB.sqlState ==
        constant.ErrorCode.UserName_Unavailable
      ) {
        errorCode = constant.ErrorCode.UserName_Unavailable;
        errorMessage = constant.ErrorMessage.UserName_Unavailable;
      } else if (
        errsaveUserDB.sqlState &&
        errsaveUserDB.sqlState ==
        constant.ErrorCode.Invalid_User_Name_Or_Password
      ) {
        errorCode = constant.ErrorCode.Invalid_User_Name_Or_Password;
        errorMessage = constant.ErrorMessage.Invalid_User_Name_Or_Password;
      } else {
        errorCode = constant.ErrorCode.ApplicationError;
        errorMessage = constant.ErrorMessage.ApplicationError;
      }
      functionContext.error = new coreRequestModel.ErrorModel(
        errorMessage,
        errorCode
      );
      throw functionContext.error;
    }
  };

module.exports.fetchUserLoginDetailsDB = async (
functionContext,
resolvedResult
) => {
var logger = functionContext.logger;
logger.logInfo("fetchUserLoginDetailsDB() Invoked!");
try {
    let rows = await databaseModule.knex.raw(
    `CALL usp_fetch_user_login_details('${resolvedResult.email}')`
    );
    logger.logInfo(
    `fetchUserLoginDetailsDB() :: Returned Result :: ${JSON.stringify(
        rows[0][0]
    )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
} catch (errfetchUserLoginDetailsDB) {
    logger.logInfo(
    `fetchUserLoginDetailsDBDB() :: Error :: ${JSON.stringify(
        errfetchUserLoginDetailsDB
    )}`
    );
    var errorCode = null;
    var errorMessage = null;
    if (
    errfetchUserLoginDetailsDB.sqlState &&
    errfetchUserLoginDetailsDB.sqlState == constant.ErrorCode.Invalid_User
    ) {
    errorCode = constant.ErrorCode.Invalid_User;
    errorMessage = constant.ErrorMessage.Invalid_User;
    } else if (
    errfetchUserLoginDetailsDB.sqlState &&
    errfetchUserLoginDetailsDB.sqlState ==
    constant.ErrorCode.Invalid_User_Name_Or_Password
    ) {
    errorCode = constant.ErrorCode.Invalid_User_Name_Or_Password;
    errorMessage = constant.ErrorMessage.Invalid_User_Name_Or_Password;
    } else if (
    errfetchUserLoginDetailsDB.sqlState &&
    errfetchUserLoginDetailsDB.sqlState ==
    constant.ErrorCode.UserName_Unavailable
    ) {
    errorCode = constant.ErrorCode.UserName_Unavailable;
    errorMessage = constant.ErrorMessage.UserName_Unavailable;
    } else {
    errorCode = constant.ErrorCode.ApplicationError;
    errorMessage = constant.ErrorMessage.ApplicationError;
    }
    functionContext.error = new coreRequestModel.ErrorModel(
    errorMessage,
    errorCode
    );
    throw functionContext.error;
}
};

module.exports.userLoginDB = async (functionContext, resolvedResult) => {
    var logger = functionContext.logger;
    logger.logInfo("userLoginDB() Invoked!");
    try {
      let rows = await databaseModule.knex.raw(
        `CALL usp_user_login('${resolvedResult.email}','${functionContext.currentTs}')`
      );
      logger.logInfo(
        `userLoginDB() :: Returned Result :: ${JSON.stringify(rows[0][0])}`
      );
      var result = rows[0][0][0] ? rows[0][0][0] : null;
      return result;
    } catch (erruserLoginDB) {
      logger.logInfo(
        `userLoginDB() :: Error :: ${JSON.stringify(erruserLoginDB)}`
      );
      var errorCode = null;
      var errorMessage = null;
      if (
        erruserLoginDB.sqlState &&
        erruserLoginDB.sqlState == constant.ErrorCode.Invalid_User
      ) {
        errorCode = constant.ErrorCode.Invalid_User;
        errorMessage = constant.ErrorMessage.Invalid_User;
      } else if (
        erruserLoginDB.sqlState &&
        erruserLoginDB.sqlState ==
        constant.ErrorCode.Invalid_User_Name_Or_Password
      ) {
        errorCode = constant.ErrorCode.Invalid_User_Name_Or_Password;
        errorMessage = constant.ErrorMessage.Invalid_User_Name_Or_Password;
      } else {
        errorCode = constant.ErrorCode.ApplicationError;
        errorMessage = constant.ErrorMessage.ApplicationError;
      }
      functionContext.error = new coreRequestModel.ErrorModel(
        errorMessage,
        errorCode
      );
      throw functionContext.error;
    }
  };

module.exports.getContestList = async (
functionContext
) => {
var logger = functionContext.logger;

logger.logInfo("getContestList() Invoked!");
try {
    let result = await databaseModule.knex.raw(
    `CALL usp_fetch_contest_list(${functionContext.userRole ? functionContext.userRole : 0})`
    );

    logger.logInfo(
    `getContestList() :: Contest list Fetched Successfully`
    );

    return result[0][0];
} catch (errgetContestList) {
    logger.logInfo(
    `getContestList() :: Error :: ${JSON.stringify(
        errgetContestList
    )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
    constant.ErrorMessage.ApplicationError,
    constant.ErrorCode.ApplicationError
    );
    throw functionContext.error;
}
};

module.exports.saveContestDB = async (functionContext, resolvedResult) => {
    var logger = functionContext.logger;
    logger.logInfo("saveContestDB() Invoked!");
    try {
        const contestJson = JSON.stringify({
            reference: resolvedResult.reference,
            name: resolvedResult.name,
            description: resolvedResult.description,
            contestType: resolvedResult.contestType,
            startTime: resolvedResult.startTime,
            endTime: resolvedResult.endTime,
            prize: resolvedResult.prize,
            isActive: resolvedResult.isActive,
            createdBy: functionContext.userRef,
            currentTimestamp: functionContext.currentTs,
            questions: resolvedResult.questions
        });

        let rows = await databaseModule.knex.raw(
            "CALL usp_save_contest(:contestJson)",
            {
                contestJson: contestJson
            }
        );

        logger.logInfo(
            `saveContestDB() :: Returned Result :: ${JSON.stringify(rows[0][0])}`
        );
        var result = rows[0][0][0] ? rows[0][0][0] : null;
        return result;
    } catch (errSaveContestDB) {
        logger.logInfo(
            `saveContestDB() :: Error :: ${JSON.stringify(errSaveContestDB)}`
        );
        var errorCode = null;
        var errorMessage = null;

        if (errSaveContestDB.sqlState) {
            switch (errSaveContestDB.sqlState) {
                case '10005':
                    errorCode = constant.ErrorCode.Invalid_Contest_Reference;
                    errorMessage = constant.ErrorMessage.Invalid_Contest_Reference;
                    break;
                case '10006':
                    errorCode = constant.ErrorCode.Invalid_User;
                    errorMessage = constant.ErrorMessage.Invalid_User;
                    break;
                case '10007':
                    errorCode = constant.ErrorCode.Unauthorized_Access;
                    errorMessage = constant.ErrorMessage.Only_Admins_Can_Create_Contests;
                    break;
                case '10008':
                    errorCode = constant.ErrorCode.Invalid_Question_Options;
                    errorMessage = constant.ErrorMessage.Minimum_Two_Options_Required;
                    break;
                case '10009':
                    errorCode = constant.ErrorCode.Invalid_Question_Options;
                    errorMessage = constant.ErrorMessage.At_Least_One_Correct_Option_Required;
                    break;
                case '10010':
                    errorCode = constant.ErrorCode.Invalid_Question_Options;
                    errorMessage = constant.ErrorMessage.Single_Choice_One_Correct_Option;
                    break;
                case '10011':
                    errorCode = constant.ErrorCode.Invalid_Question_Options;
                    errorMessage = constant.ErrorMessage.True_False_Two_Options_Required;
                    break;
                case '10012':
                    errorCode = constant.ErrorCode.Invalid_Question_Options;
                    errorMessage = constant.ErrorMessage.True_False_One_Correct_Option;
                    break;
                case '10013':
                    errorCode = constant.ErrorCode.Invalid_Question_Options;
                    errorMessage = constant.ErrorMessage.True_False_Options_Must_Be_True_False;
                    break;
                default:
                    errorCode = constant.ErrorCode.ApplicationError;
                    errorMessage = constant.ErrorMessage.ApplicationError;
                    break;
            }
        } else {
            errorCode = constant.ErrorCode.ApplicationError;
            errorMessage = constant.ErrorMessage.ApplicationError;
        }

        functionContext.error = new coreRequestModel.ErrorModel(
            errorMessage,
            errorCode
        );
        throw functionContext.error;
    }
};

module.exports.getContestDetailsDB = async (functionContext, contestRef) => {
    let logger = functionContext.logger;
    logger.logInfo("getContestDetailsDB() Invoked!");
    try {
        let rows = await databaseModule.knex.raw(
            "CALL usp_get_contest_details(:contestRef)",
            {
                contestRef: contestRef
            }
        );

        logger.logInfo(
            `getContestDetailsDB() :: Returned Result :: ${JSON.stringify(rows[0])}`
        );

        const contestDetails = rows[0][0][0] || null;
        const questions = rows[0][1] || [];

        return {
            ...contestDetails,
            questions: questions.map(q => ({
                questionId: q.questionId,
                questionRef: q.questionRef,
                questionText: q.questionText,
                questionType: q.questionType,
                options: q.options 
            }))
        };
    } catch (errGetContestDetailsDB) {
        logger.logInfo(
            `getContestDetailsDB() :: Error :: ${JSON.stringify(errGetContestDetailsDB)}`
        );
        let errorCode = null;
        let errorMessage = null;

        if (errGetContestDetailsDB.sqlState === '10005') {
            errorCode = constant.ErrorCode.Invalid_Contest_Reference;
            errorMessage = constant.ErrorMessage.Invalid_Contest_Reference;
        } else {
            errorCode = constant.ErrorCode.ApplicationError;
            errorMessage = constant.ErrorMessage.ApplicationError;
        }

        functionContext.error = new coreRequestModel.ErrorModel(
            errorMessage,
            errorCode
        );
        throw functionContext.error;
    }
};
const databaseModule = require("../database/database");
const coreRequestModel = require("../model/coreserviceModel");
const constant = require("../common/constant");

/**
 * This function validates the api uri and authentication token
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 * @returns 
 */
module.exports.validateRequest = async (functionContext, resolvedResult) => {
    const logger = functionContext.logger;
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
      let errorCode = null;
      let errorMessage = null;
      let errorDescription = null;
  
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

/**
 * database call to register and save the user new user
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 * @returns 
 */
module.exports.registerAndSaveUserDB = async (functionContext, resolvedResult) => {
    const logger = functionContext.logger;
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
      let result = rows[0][0][0] ? rows[0][0][0] : null;
      return result;
    } catch (errsaveUserDB) {
      logger.logInfo(
        `registerAndSaveUserDB() :: Error :: ${JSON.stringify(errsaveUserDB)}`
      );
      let errorCode = null;
      let errorMessage = null;
      if (
        errsaveUserDB.sqlState &&
        errsaveUserDB.sqlState == constant.ErrorCode.Invalid_User
      ) {
        errorCode = constant.ErrorCode.Invalid_User;
        errorMessage = constant.ErrorMessage.Invalid_User;
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


/**
 * Database call to fetch user login details for authentication
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 * @returns 
 */
module.exports.fetchUserLoginDetailsDB = async (
functionContext,
resolvedResult
) => {
const logger = functionContext.logger;
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
    let result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
} catch (errfetchUserLoginDetailsDB) {
    logger.logInfo(
    `fetchUserLoginDetailsDBDB() :: Error :: ${JSON.stringify(
        errfetchUserLoginDetailsDB
    )}`
    );
    let errorCode = null;
    let errorMessage = null;
    if (
    errfetchUserLoginDetailsDB.sqlState &&
    errfetchUserLoginDetailsDB.sqlState == constant.ErrorCode.Invalid_User
    ) {
    errorCode = constant.ErrorCode.Invalid_User;
    errorMessage = constant.ErrorMessage.Invalid_User;
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

/**
 * Database call for user log in
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 * @returns 
 */
module.exports.userLoginDB = async (functionContext, resolvedResult) => {
    const logger = functionContext.logger;
    logger.logInfo("userLoginDB() Invoked!");
    try {
      let rows = await databaseModule.knex.raw(
        `CALL usp_user_login('${resolvedResult.email}','${functionContext.currentTs}')`
      );
      logger.logInfo(
        `userLoginDB() :: Returned Result :: ${JSON.stringify(rows[0][0])}`
      );
      let result = rows[0][0][0] ? rows[0][0][0] : null;
      return result;
    } catch (erruserLoginDB) {
      logger.logInfo(
        `userLoginDB() :: Error :: ${JSON.stringify(erruserLoginDB)}`
      );
      let errorCode = null;
      let errorMessage = null;
      if (
        erruserLoginDB.sqlState &&
        erruserLoginDB.sqlState == constant.ErrorCode.Invalid_User
      ) {
        errorCode = constant.ErrorCode.Invalid_User;
        errorMessage = constant.ErrorMessage.Invalid_User;
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

/**
 * Database call to get the list of all contests
 * @param {*} functionContext 
 * @returns 
 */
module.exports.getContestList = async (
functionContext
) => {
const logger = functionContext.logger;

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


/**
 * Database call to create and update contests 
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 * @returns 
 */
module.exports.saveContestDB = async (functionContext, resolvedResult) => {
    const logger = functionContext.logger;
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
        let result = rows[0][0][0] ? rows[0][0][0] : null;
        return result;
    } catch (errSaveContestDB) {
        logger.logInfo(
            `saveContestDB() :: Error :: ${JSON.stringify(errSaveContestDB)}`
        );
        let errorCode = null;
        let errorMessage = null;

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


/**
 * Database call to get the details of the contest with contest Reference
 * @param {*} functionContext 
 * @param {*} contestRef 
 * @returns 
 */
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


/**
 * Database call for the user to join a contest
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 * @returns 
 */
module.exports.joinContestDB = async (functionContext, resolvedResult) => {
    const logger = functionContext.logger;
    logger.logInfo("joinContestDB() Invoked!");
    try {
        let rows = await databaseModule.knex.raw(
            "CALL usp_join_contest(:contestRef, :userRef, :currentTs)",
            {
                contestRef: resolvedResult.contestRef,
                userRef: functionContext.userRef,
                currentTs: functionContext.currentTs
            }
        );

        logger.logInfo(`joinContestDB() :: Returned Result :: ${JSON.stringify(rows[0][0])}`);
        return rows[0][0][0] || null;
    } catch (errJoinContestDB) {
        logger.logInfo(`joinContestDB() :: Error :: ${JSON.stringify(errJoinContestDB)}`);
        let errorCode = null;
        let errorMessage = null;

        switch (errJoinContestDB.sqlState) {
            case '10005':
                errorCode = constant.ErrorCode.Invalid_Contest_Reference;
                errorMessage = constant.ErrorMessage.Invalid_Contest_Reference;
                break;
            case '10006':
                errorCode = constant.ErrorCode.Invalid_User;
                errorMessage = constant.ErrorMessage.Invalid_User;
                break;
            case '10014':
                errorCode = constant.ErrorCode.Contest_Not_Active;
                errorMessage = constant.ErrorMessage.Contest_Not_Active;
                break;
            case '10015':
                errorCode = constant.ErrorCode.User_Already_Joined;
                errorMessage = constant.ErrorMessage.User_Already_Joined;
                break;
            case '10018':
                errorCode = constant.ErrorCode.Contest_Not_Started; // Add to constant
                errorMessage = constant.ErrorMessage.Contest_Not_Started;
                break;
            case '10019':
                errorCode = constant.ErrorCode.Contest_Ended; // Add to constant
                errorMessage = constant.ErrorMessage.Contest_Ended;
                break;
            case '10020':
                errorCode = constant.ErrorCode.Vip_Contest_Restricted; // Add to constant
                errorMessage = constant.ErrorMessageVip_Contest_Restricted;
                break;
            default:
                errorCode = constant.ErrorCode.ApplicationError;
                errorMessage = constant.ErrorMessage.ApplicationError;
                break;
        }

        functionContext.error = new coreRequestModel.ErrorModel(errorMessage, errorCode);
        throw functionContext.error;
    }
};


/**
 * Database call to Submit answers and calculate scores
 * @param {*} functionContext 
 * @param {*} resolvedResult 
 * @returns 
 */
module.exports.submitContestAnswersDB = async (functionContext, resolvedResult) => {
    const logger = functionContext.logger;
    logger.logInfo("submitContestAnswersDB() Invoked!");
    try {
        const answersJson = JSON.stringify(resolvedResult.answers);
        let rows = await databaseModule.knex.raw(
            "CALL usp_submit_contest_answers(:contestRef, :userRef, :answersJson, :finalSubmission, :currentTs)",
            {
                contestRef: resolvedResult.contestRef,
                userRef: functionContext.userRef,
                answersJson: answersJson,
                finalSubmission: resolvedResult.finalSubmission ? 1 : 0,
                currentTs: functionContext.currentTs
            }
        );

        logger.logInfo(`submitContestAnswersDB() :: Returned Result :: ${JSON.stringify(rows[0][0])}`);
        return rows[0][0][0] || null;
    } catch (errSubmitContestDB) {
        logger.logInfo(`submitContestAnswersDB() :: Error :: ${JSON.stringify(errSubmitContestDB)}`);
        let errorCode = null;
        let errorMessage = null;

        switch (errSubmitContestDB.sqlState) {
            case '10005':
                errorCode = constant.ErrorCode.Invalid_Contest_Reference;
                errorMessage = constant.ErrorMessage.Invalid_Contest_Reference;
                break;
            case '10006':
                errorCode = constant.ErrorCode.Invalid_User;
                errorMessage = constant.ErrorMessage.Invalid_User;
                break;
            case '10016':
                errorCode = constant.ErrorCode.User_Not_Joined;
                errorMessage = constant.ErrorMessage.User_Not_Joined;
                break;
            case '10018':
                errorCode = constant.ErrorCode.Contest_Not_Started;
                errorMessage = constant.ErrorMessage.Contest_Not_Started;
                break;
            case '10019':
                errorCode = constant.ErrorCode.Contest_Ended;
                errorMessage = constant.ErrorMessage.Contest_Ended;
                break;
            case '10021':
                errorCode = constant.ErrorCode.Invalid_Question_Id;
                errorMessage = constant.ErrorMessage.Invalid_Question_Id;
                break;
            case '10022':
                errorCode = constant.ErrorCode.Invalid_Option_Id;
                errorMessage = constant.ErrorMessage.Invalid_Option_Id;
                break;
            case '10023':
                errorCode = constant.ErrorCode.Contest_Finalized;
                errorMessage = constant.ErrorMessage.Contest_Finalized;
                break;
            case '10024':
                errorCode = constant.ErrorCode.Answer_Already_Submitted;
                errorMessage = constant.ErrorMessage.Answer_Already_Submitted;
                break;
            default:
                errorCode = constant.ErrorCode.ApplicationError;
                errorMessage = constant.ErrorMessage.ApplicationError;
                break;
        }

        functionContext.error = new coreRequestModel.ErrorModel(errorMessage, errorCode);
        throw functionContext.error;
    }
};


/**
 * Database call to get the leaderboard of a contest
 * @param {*} functionContext 
 * @param {*} contestRef 
 * @returns 
 */
module.exports.getContestLeaderboardDB = async (functionContext, contestRef) => {
    const logger = functionContext.logger;
    logger.logInfo("getContestLeaderboardDB() Invoked!");
    try {
        let rows = await databaseModule.knex.raw(
            "CALL usp_get_contest_leaderboard(:contestRef)",
            {
                contestRef: contestRef
            }
        );

        logger.logInfo(
            `getContestLeaderboardDB() :: Returned Result :: ${JSON.stringify(rows[0][0])}`
        );

        const leaderboardData = rows[0][0] || [];

        return leaderboardData.length ? leaderboardData.map(entry => ({
            rank: entry.rank,
            userId: entry.userId,
            userRef: entry.userRef,
            userName: entry.userName,
            score: entry.score,
            updatedAt: entry.updatedAt
        })):leaderboardData ;
    } catch (errGetLeaderboardDB) {
        logger.logInfo(
            `getContestLeaderboardDB() :: Error :: ${JSON.stringify(errGetLeaderboardDB)}`
        );
        let errorCode = null;
        let errorMessage = null;

        if (errGetLeaderboardDB.sqlState === '10005') {
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

/**
 * Database call to get all the user details to be displayed on the dashboard
 * @param {*} functionContext 
 * @returns 
 */
module.exports.getUserDetailsDB = async (functionContext) => {
    const logger = functionContext.logger;
    logger.logInfo("getUserDetailsDB() Invoked!");
    try {
        let rows = await databaseModule.knex.raw(
            "CALL usp_get_user_details(:userRef)",
            { userRef: functionContext.userRef }
        );

        logger.logInfo(
            `getUserDetailsDB() :: Returned Result :: ${JSON.stringify(rows[0])}`
        );

        const userDetails = rows[0][0][0] || null;
        const userContests = rows[0][1] || [];
        const userHistory = rows[0][2] || [];

        return {
            user: {
                userId: userDetails.userId,
                userRef: userDetails.userRef,
                name: userDetails.name,
                email: userDetails.email,
                role: userDetails.role,
                isActive: userDetails.isActive,
                createdAt: userDetails.createdAt,
                updatedAt: userDetails.updatedAt
            },
            contests: userContests.map(c => ({
                contestId: c.contestId,
                contestRef: c.contestRef,
                contestName: c.contestName,
                contestType: c.contestType,
                startTime: c.startTime,
                endTime: c.endTime,
                joinedAt: c.joinedAt,
                completedAt: c.completedAt,
                score: c.score,
                rank: c.rank
            })),
            history: userHistory.map(h => ({
                contestId: h.contestId,
                contestRef: h.contestRef,
                questionId: h.questionId,
                questionRef: h.questionRef,
                questionText: h.questionText,
                questionType: h.questionType,
                optionId: h.optionId,
                optionText: h.optionText,
                isCorrect: h.isCorrect,
                submittedAt: h.submittedAt
            }))
        };
    } catch (errGetUserDetailsDB) {
        logger.logInfo(
            `getUserDetailsDB() :: Error :: ${JSON.stringify(errGetUserDetailsDB)}`
        );
        let errorCode = null;
        let errorMessage = null;

        if (errGetUserDetailsDB.sqlState === '10006') {
            errorCode = constant.ErrorCode.Invalid_User;
            errorMessage = constant.ErrorMessage.Invalid_User;
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
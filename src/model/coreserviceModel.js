const momentTimezone = require("moment-timezone");

class functionContext {
  constructor(requestType, error, res, logger) {
    (this.requestType = requestType),
      (this.requestID = res.apiContext.requestID),
      (this.userRef = res.apiContext.userRef),
      (this.userRole = res.apiContext.userRole),
      (this.res = res),
      (this.error = error),
      (this.logger = logger),
      (this.currentTs = momentTimezone
        .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
        .tz("Asia/Dubai")
        .format("YYYY-MM-DD HH:mm:ss"));
  }
}

class apiContext {
  constructor(requestID) {
    (this.requestID = requestID),
      (this.userRef = null),
      (this.userRole = null),
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

class registerUserRequest {
    constructor(req) {
      (this.reference = req.body.Reference ? req.body.Reference : null),
        (this.name = req.body.Name ? req.body.Name : null),
        (this.password = req.body.Password ? req.body.Password : null),
        (this.email = req.body.Email ? req.body.Email : null),
        (this.role = req.body.Role ? req.body.Role : null),
        (this.isActive = req.body.IsActive
          ? req.body.IsActive
          : 0),
        (this.currentTimestamp = momentTimezone
          .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
          .tz("Asia/Dubai")
          .format("YYYY-MM-DD HH:mm:ss "));
    }
  }

  class registerUserResponse {
    constructor() {
      (this.Error = null),
        (this.Details = { 
            UserRef: null,
            Name: null,
            Email: null,
        }),
        (this.RequestID = null);
    }
  }

  class userLoginRequest {
    constructor(req) {
      this.email = req.body.Email ? req.body.Email : null;
      this.password = req.body.Password ? req.body.Password : null;
    }
  }
  class userLoginResponse {
    constructor() {
      (this.Error = null),
        (this.Details = { 
            UserRef: null,
            AuthToken: null,
            UserRole: null 
        }),
        (this.RequestID = null);
    }
  }

  class contestListResponse {
    constructor() {
      (this.Error = null),
        (this.Details = {}),
        (this.RequestID = null);
    }
  }

  class saveContestRequest {
    constructor(req) {
        this.reference = req.body.Reference ? req.body.Reference : null;
        this.name = req.body.Name ? req.body.Name : null;
        this.description = req.body.Description ? req.body.Description : null;
        this.contestType = req.body.ContestType ? req.body.ContestType : null;
        this.startTime = req.body.StartTime ? req.body.StartTime : null;
        this.endTime = req.body.EndTime ? req.body.EndTime : null;
        this.prize = req.body.Prize ? req.body.Prize : null;
        this.isActive = req.body.IsActive
        ? req.body.IsActive
        : 0,
        this.questions = req.body.Questions ? req.body.Questions : [];
    }
}

class saveContestResponse {
    constructor() {
        this.Error = null;
        this.Details = {};
        this.RequestID = null;
    }
}

class getContestRequest {
    constructor(req) {
        this.reference = req.query.reference ? req.query.reference : null;
    }
}

class getContestResponse {
    constructor() {
        this.Error = null;
        this.Details = {
            ContestId: null,
            ContestRef: null,
            ContestName: null,
            Description: null,
            ContestType: null,
            StartTime: null,
            EndTime: null,
            Prize: null,
            IsActive: null,
            CreatedBy: null,
            CreatedAt: null,
            UpdatedAt: null,
            Questions: []
        };
        this.RequestID = null;
    }
}

class joinContestRequest {
    constructor(req) {
        this.contestRef = req.query.contestRef || null;
    }
}

class joinContestResponse {
    constructor() {
        this.Error = null;
        this.Details = {
            ContestRef: null,
            Name: null,
            ContestType: null,
            StartTime: null,
            EndTime: null
        };
        this.RequestID = null;
    }
}

class submitContestRequest {
    constructor(req) {
        this.contestRef = req.query.contestRef || null;
        this.answers = req.body.Answers || [];
        this.finalSubmission = req.body.FinalSubmission !== undefined ? req.body.FinalSubmission : false;
    }
}

class submitContestResponse {
    constructor() {
        this.Error = null;
        this.Details = {
            ContestRef: null,
            Name: null,
            TotalQuestions: null,
            SubmittedAnswers: null,
            IsCompleted: null,
            Score: null
        };
        this.RequestID = null;
    }
}

class getLeaderboardRequest {
    constructor(req) {
        this.contestRef = req.query.contestRef ? req.query.contestRef : null;
    }
}

class getLeaderboardResponse {
    constructor() {
        this.Error = null;
        this.Details = {
            ContestRef: null,
            Leaderboard: []
        };
        this.RequestID = null;
    }
}

class getUserDetailsRequest {
    constructor(req) {
        this.userRef = req.query.userRef || null; 
    }
}

class getUserDetailsResponse {
    constructor() {
        this.Error = null;
        this.Details = {
            User: {},
            Contests: [],
            History: []
        };
        this.RequestID = null;
    }
}



module.exports.ErrorModel = errorModel;
module.exports.ValidateRequest = validateRequest;
module.exports.ValidateResponse = validateResponse;
module.exports.FunctionContext = functionContext;
module.exports.ApiContext = apiContext;
module.exports.RegisterUserRequest = registerUserRequest;
module.exports.RegisterUserResponse = registerUserResponse;
module.exports.UserLoginRequest = userLoginRequest;
module.exports.UserLoginResponse = userLoginResponse;
module.exports.ContestListResponse = contestListResponse;
module.exports.SaveContestRequest = saveContestRequest;
module.exports.SaveContestResponse = saveContestResponse;
module.exports.GetContestRequest = getContestRequest;
module.exports.GetContestResponse = getContestResponse;
module.exports.JoinContestRequest = joinContestRequest;
module.exports.JoinContestResponse = joinContestResponse;
module.exports.SubmitContestRequest = submitContestRequest;
module.exports.SubmitContestResponse = submitContestResponse;
module.exports.GetLeaderboardRequest = getLeaderboardRequest;
module.exports.GetLeaderboardResponse = getLeaderboardResponse;
module.exports.GetUserDetailsRequest = getUserDetailsRequest;
module.exports.GetUserDetailsResponse = getUserDetailsResponse;
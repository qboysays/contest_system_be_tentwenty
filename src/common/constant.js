module.exports.ErrorCode = {
    ApplicationError: 500,
    Invalid_Request: 501,
    Success: 200,
    Invalid_Contest_Reference: 10005,
    Invalid_User: 10006,
    Unauthorized_Access: 10007,
    Invalid_Question_Options: 10008, 
  };
  
  module.exports.ErrorMessage = {
    ApplicationError: "An Application Error Has Occured",
    Invalid_Request: "Invalid Request",
    Invalid_Login_Credentials: "Invalid username or password",
    Invalid_Contest_Reference: 'Invalid contest reference provided',
    Invalid_User: 'Invalid user reference',
    Only_Admins_Can_Create_Contests: 'Only admins can create or update contests',
    Minimum_Two_Options_Required: 'All questions must have at least 2 options',
    At_Least_One_Correct_Option_Required: 'Questions must have at least one correct option',
    Single_Choice_One_Correct_Option: 'Single-choice questions must have exactly one correct option',
    True_False_Two_Options_Required: 'True/False questions must have exactly 2 options',
    True_False_One_Correct_Option: 'True/False questions must have exactly one correct option',
    True_False_Options_Must_Be_True_False: 'True/False questions must have options "True" and "False"',
  };
  
  module.exports.RequestType = {
    AUTHENTICATEREQUEST: "AR",
    ISCUSTOMERPRESENT: "ICP",
    USERLOGIN: "UL",
    REGISTERUSER: "RU",
    GETCONTESTLIST: "GCL",
    SAVECONTESTDETAILS: "SCD",
    GETCONTESTDETAILS: "GCD",
  };
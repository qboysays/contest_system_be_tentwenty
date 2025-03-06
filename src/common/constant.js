module.exports.ErrorCode = {
    ApplicationError: 500,
    Invalid_Request: 501,
    Success: 200,
  };
  
  module.exports.ErrorMessage = {
    ApplicationError: "An Application Error Has Occured",
    Invalid_Request: "Invalid Request",
    Invalid_Login_Credentials: "Invalid username or password",
  };
  
  module.exports.RequestType = {
    AUTHENTICATEREQUEST: "AR",
    ISCUSTOMERPRESENT: "ICP",
    ADMINLOGIN: "AL",
  };

const joi = require("joi");

module.exports.validateRequest = (requestParams) =>{
    const joiSchema = joi.object({
      apiUri: joi.string().required(),
      authorization: joi.string().required(),
      authToken: joi.string().optional(),
    });
    return joiSchema.validate(requestParams);
  }
  
  
module.exports.registerUserRequest = (requestParams) => {
    var joiSchema = joi.object({
      reference: joi.string().required().allow(null),
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      role: joi.number().required(),
      isActive: joi.number().optional().allow(0,1),
      currentTimestamp: joi.string().optional(),
    });
    return joiSchema.validate(requestParams);
  };

module.exports.userLoginRequest = (requestParams) => {
var joiSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});
return joiSchema.validate(requestParams);
};
  
module.exports.saveContestRequest = (requestParams) => {
    const optionSchema = joi.object({
        text: joi.string().required(),
        isCorrect: joi.number().valid(0, 1).required()
    });

    const questionSchema = joi.object({
        questionText: joi.string().required(),
        questionType: joi.string().valid('single', 'multiple', 'true_false').required(),
        options: joi.array().items(optionSchema).min(2).required()
    });

    const joiSchema = joi.object({
        reference: joi.string().required().allow(null),
        name: joi.string().required(),
        description: joi.string().optional().allow(null),
        contestType: joi.string().valid('normal', 'vip').required(),
        startTime: joi.string().required(),
        endTime: joi.string().required(),
        prize: joi.string().optional().allow(null),
        isActive: joi.number().valid(0, 1).optional(),
        currentTimestamp: joi.string().optional(),
        questions: joi.array().items(questionSchema).min(1).required()
    });

    return joiSchema.validate(requestParams);
};

module.exports.getContestRequest = (requestParams) => {
    const joiSchema = joi.object({
        reference: joi.string().uuid().required()
    });

    return joiSchema.validate(requestParams);
};
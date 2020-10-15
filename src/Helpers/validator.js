const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
 
const querySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  video: Joi.string().required(),
  webpage: Joi.string().required(),
  image: Joi.string().required(),
  location: Joi.string().required(),
  question1: Joi.string().required(),
  question2: Joi.string().required(),
  question3: Joi.string().required(),
  answer1: Joi.string().required(),
  answer2: Joi.string().required(),
  answer3: Joi.string().required(),


})
 
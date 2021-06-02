const { body, validationResult } = require("express-validator");
const Auth = require("../../config/database/mongoose/models/Auth");
const Responser = require('../../lib/Responser')
const { NoUserFound, UserAlreadyExist } = require("../../lib/ErrorHandler");

class AuthController {
  saveValidation = () => {
    return [
      body("emailId", "Email is required.")
        .exists()
        .isEmail()
        .withMessage("Invalid value for Email"),
      body("password")
        .exists()
        .isString()
        .withMessage("Invalid value for password"),
    ];
  };
  loginValidation = () => {
    return [
      body("emailId", "Email is required.")
        .exists()
        .isEmail()
        .withMessage("Invalid value for Email"),
      body("password")
        .exists()
        .isString()
        .withMessage("Invalid value for password"),
    ];
  };

  register = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const err = new Error('Validation Failed')
          err.status = 400;
          next(err, req, res, next)
          return;
        }
        const {emailId, password} = req.body;
        const checker = await Auth.findOne({emailId});
        if(checker){
          UserAlreadyExist()
        }
        const user = new Auth({
            emailId,
            password
        })
        await user.save();
        return Responser.success(200, 'Login Successful', {}, res)
      } catch (error) {
        return Responser.failed(error, req, res, next)
      }
  }

  login = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error('Validation Failed')
        err.status = 400;
        next(err, req, res, next)
        return;
      }
      const {emailId, password} = req.body;
      const user = await Auth.findOne({emailId: emailId});
      if(!user){
        NoUserFound()
      }
      const validity = await user.comparePassword(password);
      if(validity){
        return Responser.success(200, 'Login Successful', {}, res)
      } 
      __logger.warn('login failed', {emailId})
      NoUserFound();
    } catch (error) {
      __logger.error(error.toString())
      return Responser.failed(error, req, res, next)
    }
  };

  getAllUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error('Validation Failed')
        err.status = 400;
        next(err, req, res, next)
        return;
      }
      const users = await Auth.find().lean();
      if(!users.length){
        NoUserFound()
      }
      return Responser.success(200, 'fetch Successful', users, res)
    } catch (error) {
      __logger.error(error.toString())
      return Responser.failed(error, req, res, next)
    }
  }
}
module.exports = new AuthController();

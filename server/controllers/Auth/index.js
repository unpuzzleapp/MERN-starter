const { body, validationResult } = require("express-validator");
const Auth = require("../../config/database/mongoose/models/Auth");
const Puzzlepiece = require("../../config/database/mongoose/models/Puzzlepiece");
const Responser = require("../../lib/Responser");
const Authentication = require("../../lib/Authentication");
const { NoUserFound, UserAlreadyExist } = require("../../lib/ErrorHandler");
const { encrypt } = require("../../lib/Encryption");
const { convertIntoLikesList } = require("../../helper/auth");

class AuthController {
  saveValidation = () => {
    return [
      body("email", "Email is required.")
        .exists()
        .isEmail()
        .withMessage("Invalid value for Email"),
      body("password")
        .exists()
        .isString()
        .withMessage("Invalid value for password"),
      body("role").exists().isString().withMessage("Invalid value for role"),
    ];
  };
  loginValidation = () => {
    return [
      body("email", "Email is required.")
        .exists()
        .isEmail()
        .withMessage("Invalid value for Email"),
      body("password")
        .exists()
        .isString()
        .withMessage("Invalid value for password"),
    ];
  };

  register = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("Validation Failed");
        err.status = 400;
        next(err, req, res, next);
        return;
      }
      const { email, password, role, name, address, phone } = req.body;
      const checker = await Auth.findOne({ email });
      if (checker) {
        UserAlreadyExist();
      }
      const user = new Auth({
        email,
        password,
        role,
        name,
        address,
        phone,
      });
      await user.save();
      const token = Authentication.generateToken(user.role, { id: user._id });
      return Responser.success(
        200,
        "User saved Successful",
        { token, role },
        res
      );
    } catch (error) {
      __logger.error("registration failed: ", error);
      return Responser.failed(error, req, res, next);
    }
  };

  login = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("Validation Failed");
        err.status = 400;
        next(err, req, res, next);
        return;
      }
      const { email, password } = req.body;
      let user = await Auth.findOne({ email: email });
      if (!user) {
        NoUserFound();
      }
      const validity = await user.comparePassword(password);
      const token = Authentication.generateToken(user.role, { id: user._id });
      if (validity) {
        return Responser.success(
          200,
          "Login Successful",
          { token, role: user.role },
          res
        );
      }
      __logger.warn("login failed", { email });
      NoUserFound();
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  getAllUser = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("Validation Failed");
        err.status = 400;
        next(err, req, res, next);
        return;
      }
      const users = await Auth.find().lean();
      if (!users.length) {
        NoUserFound();
      }
      return Responser.success(200, "fetch Successful", users, res);
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  getProfile = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("Validation Failed");
        err.status = 400;
        next(err, req, res, next);
        return;
      }
      const user = await Auth.findOne(
        { _id: req.user.id },
        { password: 0 }
      ).lean();
      if (!user) {
        NoUserFound();
      }
      return Responser.success(200, "fetch Successful", user, res);
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("Validation Failed");
        err.status = 400;
        next(err, req, res, next);
        return;
      }
      const user = await Auth.findOne(
        { _id: req.user.id },
        { password: 0 }
      ).lean();
      if (!user) {
        NoUserFound();
      }
      // get likes
      const puzzle = await Puzzlepiece.find({
        likes: { $in: [user._id] },
      }, {
        puzzlepieceId: 1,
      });

      // get notifications

      const obj = {
        credentials: user,
        likes: convertIntoLikesList(puzzle, user),
        notification: [],
      };
      return Responser.success(200, "fetch Successful", obj, res);
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  updateProfile = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("Validation Failed");
        err.status = 400;
        next(err, req, res, next);
        return;
      }
      const user = await Auth.findOneAndUpdate(
        { _id: req.user.id },
        req.body
      ).lean();
      if (!user) {
        NoUserFound();
      }
      return Responser.success(200, "fetch Successful", user, res);
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  seedAdmin = async () => {
    const data = {
      email: process.env.ADMIN_EMAIL_ID,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
      address: process.env.ADMIN_ADDRESS || "",
      phone: process.env.ADMIN_PHONE || "",
      name: process.env.ADMIN_NAME || "",
    };
    const checker = await Auth.findOne({ email: process.env.ADMIN_EMAIL_ID });
    if (checker) {
      return true;
    }
    data.password = encrypt(data.password);
    const user = new Auth(data);
    await user.save();
    return true;
  };
}
module.exports = new AuthController();

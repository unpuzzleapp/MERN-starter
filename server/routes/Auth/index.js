const { Router } = require('express');
const Roles = require('../../middlewares/AuthenticateRoles');
const AuthController = require('../../controllers/Auth');
const RateLimiter = require('../../middlewares/RateLimiter');
const SlowDown = require('../../middlewares/SlowDown');
const router = Router({ mergeParams: true });

router.post('/login', SlowDown, AuthController.loginValidation(), AuthController.login);
router.get('/profile', Roles.Any, AuthController.getProfile);
router.get('/user', Roles.Any, AuthController.getUser);
router.post('/user', Roles.Any, AuthController.updateProfile);
router.put('/profile', Roles.Any, AuthController.updateProfile);
router.post('/register', AuthController.saveValidation(), AuthController.register);
router.get('/v1/', RateLimiter, Roles.Admin, AuthController.getAllUser);

module.exports = router;

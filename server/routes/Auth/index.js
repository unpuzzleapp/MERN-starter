const { Router } = require('express');
const router = Router({ mergeParams: true });
const Roles = require('../../middlewares/AuthenticateRoles');
const AuthController = require('../../controllers/Auth');

router.post('/v1/login', AuthController.loginValidation(), AuthController.login);
router.get('/v1/profile', Roles.Owner, AuthController.getProfile);
router.put('/v1/profile', Roles.Owner, AuthController.updateProfile);
router.post('/v1/register', AuthController.saveValidation(), AuthController.register);
router.get('/v1/', Roles.Admin, AuthController.getAllUser)

module.exports = router;

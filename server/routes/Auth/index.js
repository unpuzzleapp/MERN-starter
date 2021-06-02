const { Router } = require('express');
const router = Router({ mergeParams: true });
const Roles = require('../../middlewares/AuthenticateRoles');
const AuthController = require('../../controllers/Auth');

router.post('/v1/login', AuthController.login);
router.post('/v1/register', AuthController.register);
router.get('/v1/', AuthController.getAllUser)

module.exports = router;

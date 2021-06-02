const Authentication = require('./../lib/Authentication.js');
class AuthRoles {
    
    Authenticate = async (req, res, next, role) => {
        try {
            let decode = await Authentication.authenticate(req.headers.authorization, role)
            req.user = decode;
            next();
        } catch (error) {
            if(error.name == 'TokenExpiredError'){
                res.status(498).send({
                    message : 'Your token is expired!'
                })
            } else {
                res.status(401).send({
                    message : 'Unauthorized!'
                })
            }
        }
    }
    Customer = (req, res, next) => {
        this.Authenticate(req, res, next, 'customer')
    }
    Owner = (req, res, next) => {
        this.Authenticate(req, res, next, 'owner')
    }
    Admin = (req, res, next) => {
        this.Authenticate(req, res, next, 'admin')
    }
}
module.exports = new AuthRoles()
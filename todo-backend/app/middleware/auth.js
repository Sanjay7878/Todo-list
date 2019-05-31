const mongoose = require('mongoose')
const Auth = mongoose.model('Auth')

const logger = require('../libs/logger')
const check = require('../libs/check')
const response = require('../libs/response')
const token = require('../libs/tokenLib')

let isAuthorized = (req, res, next)=>{
    if(req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')){
        Auth.findOne({authToken: req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')}, (err, authDetails)=>{
            if(err){
                logger.error(err.message, "auth middleware", 6)
                let apiResponse = response.generate(true, "Failed to Authorize", 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(authDetails)){
                logger.error("No Authorization Key is present", "auth middleware", 6)
                let apiResponse = response.generate(true, "No Authorization Key is present", 404, null)
                res.send(apiResponse)
            } else {
                token.verifyToken(authDetails.authToken, authDetails.tokenSecret, (err, decoded)=>{
                    if(err){
                        console.log(err)
                        logger.error(err.message, "auth middleware", 6)
                        let apiResponse = response.generate(true, "Failed to Authorize", 500, null)
                        res.send(apiResponse)
                    } else {
                        req.user = {userId: decoded.data.userId}
                        next()
                    }
                })
            }
        })
    } else {
        logger.error("Authorization Token is Missing", "authMiddleware", 6)
        let apiResponse = response.generate(true, "Authorization Token is Missing", 400, null)
        res.send(apiResponse)
    }
} // end is authorized

module.exports = {
    isAuthorized: isAuthorized
}
const mongoose = require('mongoose')
const shortid = require('shortid')
const appConfig = require('../../appConfig/appConfig')
const events = require('events')
const eventEmitter = new events.EventEmitter()
eventEmitter.setMaxListeners(100);

/*Libraries*/
const check = require('../libs/check')
const response = require('../libs/response')
const logger = require('../libs/logger')
const validateInput = require('../libs/paramsValidationLib')
const paswwordLib = require('../libs/passwordLib')
const token = require('../libs/tokenLib')
const time = require('../libs/timeLib')
const mailing = require('../libs/mailingLib')

/*Models*/
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')  
const NotificationModel = mongoose.model('Notification')

//Create an event handler:
let mailEventHandler = (data) => {
    console.log("mailEventHandler called for " + data.email);
    mailing.sendEmail(data.email, data.message, data.html);
}

//Assign the event handler to an event
eventEmitter.on('email', mailEventHandler);


let signupFunction = (req, res) =>{
    
    let validateUserInput = () =>{
        return new Promise((resolve, reject)=>{
            if(req.body.email){
                if(!validateInput.Email(req.body.email)){
                    let apiResponse = response.generate(true, "Email Address does not meet the requirements", 400, null)
                    reject(apiResponse)
                } else if(check.isEmpty(req.body.password)){
                    let apiResponse = response.generate(true, "Password parameter is missing", 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Required Parameter Field is missing', ' userController: SignupFunction. validateUserInput', 10)
                let apiResponse = response.generate(true, "Parameters are missing", 400, null)
                reject(apiResponse)
            }
        })
    } // end validate input

    let signup = () =>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({email: req.body.email})
                .exec((err, retrivedDetails)=>{
                    if(err){
                        logger.error(err.message, " userController: signupFunction, signup", 10)
                        let apiResponse = response.generate(true, `Some error occured: ${err.message}`, 500, null)
                        reject(apiResponse)
                    }else if(check.isEmpty(retrivedDetails)){

                        let newUser = new UserModel({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            userId: shortid.generate(),
                            country: req.body.country,
                            countryCode: req.body.countryCode,
                            mobileNumber: req.body.mobileNumber,
                            email: req.body.email,
                            password: paswwordLib.hashPassword(req.body.password),
                            createdOn: time.now()
                        })

                        newUser.save((err, result)=>{
                            if(err){
                                logger.error(err, "userController: signupFunction, signup", 10)
                                let apiResponse = response.generate(true, "Failed to Create User", 500, null)
                                reject(apiResponse)
                            } else {
                                const html = `<h2>Welcome To Task Ready Application</h2>`
                                let details = {
                                    email: req.body.email.toLowerCase(),
                                    message: "Welcome",
                                    html: html
                                }
                                setTimeout(()=>{
                                    eventEmitter.emit('email', details)
                                }, 2000)
                                let newUserObj = result.toObject()
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.info("User Already Exists", ' userController: signupFunction, signup', 8)
                        let apiResponse = response.generate(true, "User Already Present", 403, null)
                        reject(apiResponse)
                    }
                })
        })
    } // end signup

    validateUserInput(req, res)
        .then(signup)
        .then((resolve)=>{
            delete resolve.password
            let apiResponse = response.generate(false, 'User Created Succesfully', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
} // end signup Function

let loginFunction = (req, res)=>{

    let findUser = () =>{
        return new Promise((resolve, reject)=>{
            if(req.body.email){
                UserModel.findOne({email: req.body.email}, (err, userDetails)=>{
                        if(err){
                            logger.error(err.message, ' userController: loginFunction, findUser', 10)
                            let apiResponse = response.generate(true, `Failed Login due to ${err.message}`, 500, null)
                            reject(apiResponse)
                        } else if(check.isEmpty(userDetails)){
                            logger.error('No user Found', ' userController: loginFunction, findUser', 10)
                            let apiResponse = response.generate(true, "No user Details Found", 404, null)
                            reject(apiResponse)
                        } else {
                            logger.info('User Found', ' userController: loginFunction, findUser', 10)
                            resolve(userDetails)
                        }
                    })
            } else {
                logger.error("Email Address is missing", "userController: loginFunction, findUser", 10)
                let apiResponse = response.generate(true, "Email parameter is missing", 400, null)
                reject(apiResponse)
            }
        })
    } // end find user

    let validatePassword = (retrivedUserDetails) =>{
        return new Promise((resolve, reject)=>{
            paswwordLib.comparePassword(req.body.password, retrivedUserDetails.password, (err, isMatch)=>{
                if(err){
                    logger.error(err.message, ' usercontroller: loginFunction, validatePassword', 10)
                    let apiResponse = response.generate(true, 'Failed to login', 500, null)
                    reject(apiResponse)
                } else if(isMatch){
                    let retrivedUserDetailsObj = retrivedUserDetails.toObject()
                        delete retrivedUserDetailsObj.password
                        delete retrivedUserDetailsObj.__v
                        delete retrivedUserDetailsObj._id
                        delete retrivedUserDetailsObj.createdOn
                        resolve(retrivedUserDetailsObj)
                } else {
                    logger.error('Invalid Password', ' userController: loginFunction, validatePassword', 10)
                    let apiResponse = response.generate(true, "Password entered is Invalid", 403, null)
                    reject(apiResponse)
                }
            })
        })
    } // end validate password

    let generateToken = (userDetails) =>{
        return new Promise((resolve, reject)=>{
            token.generateToken(userDetails, (err, tokenDetails)=>{
                if(err){
                    logger.error(err.message, " userController: loginFunction, generateToken", 10)
                    let apiResponse = response.generate(true, "Failed to Genreate Token", 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    } // end generateToken

    let saveToken = (tokenDetails) =>{
        return new Promise((resolve, reject)=>{
            AuthModel.findOne({userId: tokenDetails.userId}, (err, retrivedTokenDetails)=>{
                if(err){
                    logger.error(err.message, ' userController: loginFunction, saveToken', 10)
                    let apiResponse = response.generate(true, "Failed to save token details", 500, null)
                    reject(apiResponse)
                }else if(check.isEmpty(retrivedTokenDetails)){
                    let newAuth = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGeneratedOn: Date.now()
                    })

                    newAuth.save((err, newTokenDetails)=>{
                        if(err){
                            logger.error(err.message, " userController: loginFunction, saveToken", 10)
                            let apiResponse = response.generate(true, "Failed to Generate Token Details", 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrivedTokenDetails.authToken = tokenDetails.token
                    retrivedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrivedTokenDetails.tokenGeneratedOn = time.now()

                    retrivedTokenDetails.save((err, newTokenDetails)=>{
                        if(err){
                            logger.error(err.message, " userController: loginFunction, saveToken", 10)
                            let apiResponse = response.generate(true, "Failed to Generate Token Details", 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    } // end save token

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve)=>{
            console.log("Login Successfully")
            let apiResponse = response.generate(false, "Login Successful", 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log("Login Failed")
            console.log(err)
            res.status(err.status)
            res.send(err)
        })

} // end login function

let logoutFunction = (req, res) =>{
    AuthModel.remove({userId: req.body.userId}, (err, result)=>{
        if(err){
            logger.error(err.message, ' userController: logoutFunction', 10)
            let apiResponse = response.generate(true, `Failed Logout due to ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)){
            logger.error('Already Logged ot Invalid UserId', ' userController: logoutFunction', 10)
            let apiResponse = response.generate(true, "Already Logged out or Invalid UserId", 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, "Logged out successfully", 200, null)
            res.send(apiResponse)
        }
    })
} // end logout function

let getAllUsers = (req,res)=>{
    UserModel.find()
        .select('-__v -_id -password')
        .lean()
        .exec((err, result)=>{
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Users Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No Users Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
} // end get all users

let getSingleUser = (req,res)=>{
    UserModel.findOne({userId: req.body.userId || req.query.userId})
        .select('-__v -_id -password')
        .exec((err, result)=>{
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To get user details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Found', 200, result)
                res.send(apiResponse)
            }
        })
} // end get single user 

let deleteUser = (req, res)=>{
    UserModel.deleteOne({userId : req.body.userId}, (err, result)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: deleteUser', 10)
            let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: deleteUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the user successfully', 200, result)
            res.send(apiResponse)
        }
    })
} // end delete user

let editUser = (req, res)=>{
    let options = req.body || req.params || req.query
    UserModel.update({userId: req.body.userId}, options, {multi: true}, (err, result)=>{
        if(err) {
            console.log(err)
            logger.error(err.message, 'User Controller: editUser', 10)
            let apiResponse = response.generate(true, 'Failed To Edit User Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User Details Edited successfully', 200, result)
            res.send(apiResponse)
        }
    })
} // end edit user

let sendResetPasswordLink = (req, res)=>{
    if(check.isEmpty(req.body.email)){
        logger.error("Email Address missing", " userController: sendResetPasswordLink", 8)
        let apiResponse = response.generate(true, "Email Address missing", 404, null)
        res.send(apiResponse)
    } else {
        UserModel.findOne({email: req.body.email}, (err, userDetails)=>{
            if(err){
                logger.error(err, "userController: sendResetPasswordLink", 8)
                let apiResponse = response.generate(true, "Failed to find the user", 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(userDetails)){
                logger.error("No User Found", "userController: sendResetPasswordLink", 8)
                let apiResponse = response.generate(true, "No User Foundr", 404, null)
                res.send(apiResponse)
            } else {
                logger.info("User Found", "userController: sendResetPasswordLink", 8)
                const html = `<a href="http://localhost:4200/${userDetails.userId}/reset-password"> Click Here to reset the password</a>`
                let details = {
                    email: req.body.email,
                    message: "Rest Password Link",
                    html: html
                }
                setTimeout(()=>{
                    eventEmitter.emit('email', details)
                }, 2000)

                let apiResponse = response.generate(false, "User Details Found", 200, "Mail Has Been Sent")
                res.send(apiResponse)
            }
        })
    }
} // end send reset password link

let resetPassword = (req, res)=>{

    let findUser = () =>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId: req.body.userId || req.params.userId}, (err, userDetails)=>{
                if(err) {
                    console.log(err)
                    logger.error(err.message, 'User Controller: resetPassword, findUser', 10)
                    let apiResponse = response.generate(true, 'Failed To find user Details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(userDetails)) {
                    logger.info('No User Found', 'User Controller: resetPassword, findUser')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(userDetails)
                }
            })
        })
    } // end find user

    let reset = (user) =>{
        return new Promise((resolve, reject)=>{
            if(req.body.password){
                UserModel.updateOne({userId: user.userId}, {password: paswwordLib.hashPassword(req.body.password)}, {multi: true}, (err, result)=>{
                    if(err) {
                        console.log(err)
                        logger.error(err.message, 'User Controller: resetPassword, reset', 10)
                        let apiResponse = response.generate(true, 'Failed To Reset The Password', 500, null)
                        reject(apiResponse)
                    }else {
                        resolve(result)
                    }
                })
            } else {
                logger.error("Password is missing", "User Controller: resetPassword, reset", 10)
                let apiResponse = response.generate(true, "Password is missing", 404, null)
                reject(apiResponse)
            }
            
        })
    } // end reset

    findUser(req, res)
        .then(reset)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'Password Reset Successful', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })

} // end reset password

let changePassword = (req, res) =>{
    if(check.isEmpty(req.body.password)){
        logger.error("Password Parameter is Missing", " UserController: changePassword", 8)
        let apiResponse = response.generate(true, "Password Parameter is Missing", 404, null)
        res.send(apiResponse)
    }else {
        UserModel.updateOne({userId: req.body.userId}, {password: paswwordLib.hashPassword(req.body.password)}, (err, result)=>{
            if(err){
                logger.error(err, " UserController: changePassword", 8)
                let apiResponse = response.generate(true, "Failed to Change The Password", 200, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)){
                logger.error("No User Found", " UserController: changePassword", 8)
                let apiResponse = response.generate(true, "No User Found", 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Password changed", " UserController: changePassword", 8)
                let apiResponse = response.generate(false, "Password changed", 200, result)
                res.send(apiResponse)
            }
        })
    }
} // end change password


module.exports = {
    signupFunction: signupFunction,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    deleteUser: deleteUser,
    editUser: editUser,
    resetPassword: resetPassword,
    sendResetPasswordLink: sendResetPasswordLink,
    changePassword: changePassword
}
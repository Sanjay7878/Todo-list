const appConfig = require('../../appConfig/appConfig')
const userController = require('../appController/userController')

const auth = require('../middleware/auth')

// function to set up the routing in the application
module.exports.setRouter = (app) =>  {

    let baseUrl = `${appConfig.apiVersion}/user`

    //params: firstName, lastName, country, countryCode, mobileNumber, email, password
    app.post(`${baseUrl}/signup`, userController.signupFunction)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/user/singup Api for user to singup
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} firstName first name of the user. (body params) (required)
     * @apiParam {string} lastName last name of the user. (body params) (required)
     * @apiParam {string} country country of the user. 
     * @apiParam {string} countryCode countryCode of the user's country.
     * @apiParam {string} mobileNumber mobile number of the user.
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "User Created Succesfully",
        * "status": 200,
        * "data": {
               "firstName": "string",
               "lastName": "string",
               "country": "string",
               "countryCode": "string",
               "mobileNumber": number,
               "createdOn": "date",
               "_id": "string",
               "userId": "string",
               "email": "string",
               "friends": [],
               "__v": 0
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to Create User",
        * "status": 500,
        * "data": null
        * }
     */

    //params: email, password
    app.post(`${baseUrl}/login`, userController.loginFunction)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/user/login Api for user login
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Login Successful",
        * "status": 200,
        * "data": {
        *           "authToken": "string",
                    "userDetails": {
                                    "firstName": "string",
                                    "lastName": "string",
                                    "country": "string",
                                    "countryCode": "string",
                                    "mobileNumber": number,
                                    "userId": "string",
                                    "email": "string",
                                    "friends": []
                              }
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No user Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId
    app.post(`${baseUrl}/logout`, userController.logoutFunction)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/user/logout Api for Logout
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        *   "error": false,
            "message": "Logged out successfully",
            "status": 200,
            "data": null
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Already Logged out or Invalid UserId",
        * "status": 404,
        * "data": null
        * }
     */

    //params: authToken
    app.get(`${baseUrl}/get/all`,auth.isAuthorized, userController.getAllUsers)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/user/get/all Get All Users
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All User Details Found",
        * "status": 200,
        * "data": {
                  "firstName": "string",
                  "lastName": "string",
                  "country": "string",
                  "countryCode": "string",
                  "mobileNumber": number,
                  "createdOn": "date"
                  "userId": "string",
                  "email": "string",
                  "friends": []
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Users Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId, authToken
    app.get(`${baseUrl}/get/user`, auth.isAuthorized, userController.getSingleUser)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/user/get/user Get Single User Info
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user whose info is needed
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "User Found",
        * "status": 200,
        * "data": {
                  "firstName": "string",
                  "lastName": "string",
                  "country": "string",
                  "countryCode": "string",
                  "mobileNumber": number,
                  "createdOn": "date"
                  "userId": "string",
                  "email": "string",
                  "friends": []
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No User Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId, authToken
    app.post(`${baseUrl}/delete/user`, auth.isAuthorized, userController.deleteUser)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/user/delete/user Api to delete user details
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user whose info is needed
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Deleted the user successfully",
        * "status": 200,
        * "data": { 
        *       "n": 1,
                "ok": 1,
                "deletedCount": 1
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No user Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId, authToken
    
    //Other parameters: optional
    app.put(`${baseUrl}/edit/userId`, auth.isAuthorized, userController.editUser)
    /**
     * @api {put} http://todo.sanjayinfotechy.com/api/v1/user/edit/userId Api to edit user details
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user whose info is needed
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "User Details Edited successfully",
        * "status": 200,
        * "data": {
        *           "n": 1,
                    "nModified": 1,
                    "ok": 1
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No user Found",
        * "status": 404,
        * "data": null
        * }
     */


    //params: email
    app.post(`${baseUrl}/forgot-password`, userController.sendResetPasswordLink)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/user/forgot-password Api to send password reset link
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} email email address of the user 
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "User Details Found",
        * "status": 200,
        * "data": "Mail Has Been Sent"
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No user Found",
        * "status": 404,
        * "data": null
        * }
     */
   
    //params: userId, password
    app.post(`${baseUrl}/:userId/reset-password`, userController.resetPassword)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/user/:userId/reset-password Api for forgot-password
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user
     * @apiParam {String} password new password of the user
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Password Reset Successful",
        * "status": 200,
        * "data": {
               "n": 1,
               "nModified": 1,
               "ok": 1
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed To Reset The Password",
        * "status": 500,
        * "data": null
        * }
     */
   
    //params: userId, password
    app.post(`${baseUrl}/change/password`, userController.changePassword)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/user/change/password Api for change the existing password
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user 
     * @apiParam {String} password new password of the user
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Password changed",
        * "status": 200,
        * "data": {
               "n": 1,
               "nModified": 1,
               "ok": 1
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to Change The Password",
        * "status": 500,
        * "data": null
        * }
     */
      

} // end set Router

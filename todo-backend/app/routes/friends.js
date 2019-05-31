const appConfig = require('../../appConfig/appConfig')
const friendsConstroller = require('../appController/friendsController')
const notificationController = require('../appController/notificationController')

const auth = require('../middleware/auth')

// function to set up the routing in the application
module.exports.setRouter = (app) =>  {

    let baseUrl = `${appConfig.apiVersion}/friends`

    //params: userId
    app.get(`${baseUrl}/get/friend-requests`, friendsConstroller.getAllFriendRequests)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/friends/get/friend-requests Get All Particular User Friend Requests
     * @apiVersion 0.0.1
     * @apiGroup Friends
     * 
     * @apiParam {string} userId userId of the user. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Friend Requests Found'",
        * "status": 200,
        * "data": {
                    "_id": "string",
                    "friends": [
                        {
                            "friendId": "string",
                            "friendName": "string",
                            "email": "string",
                            "mobileNumber": "number",
                            "requestStatus": "string",
                            "modifiedOn": "date",
                            "_id": "string"
                        }
                    ]
                }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Friends Found,
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId
    app.get(`${baseUrl}/get/sent-requests`, friendsConstroller.getAllSentRequested)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/friends/get/sent-requests Get All Particular User Sent Requests
     * @apiVersion 0.0.1
     * @apiGroup Friends
     * 
     * @apiParam {string} userId userId of the user. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Sent Requests Found",
        * "status": 200,
        * "data": {
                    "_id": "string",
                    "friends": [
                        {
                            "friendId": "string",
                            "friendName": "string",
                            "email": "string",
                            "mobileNumber": "number",
                            "requestStatus": "string",
                            "modifiedOn": "date",
                            "_id": "string"
                        }
                    ]
                }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Friends Found,
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId
    app.get(`${baseUrl}/get/all-friends`, friendsConstroller.getAllFriends)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/friends/get/all-friends Get All Friends Of A User
     * @apiVersion 0.0.1
     * @apiGroup Friends
     * 
     * @apiParam {string} userId userId of the user. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Friends Found",
        * "status": 200,
        * "data": {
                    "_id": "string",
                    "friends": [
                        {
                            "friendId": "string",
                            "friendName": "string",
                            "email": "string",
                            "mobileNumber": "number",
                            "requestStatus": "string",
                            "modifiedOn": "date",
                            "_id": "string"
                        }
                    ]
                }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": false,
        * "message": "No Friends Found,
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId
    app.get(`${baseUrl}/get/non-friends`, friendsConstroller.getAllNonFriends)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/friends/get/non-friends Get All Users Who are Not Friends
     * @apiVersion 0.0.1
     * @apiGroup Friends
     * 
     * @apiParam {string} userId userId of the user. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Users Found",
        * "status": 200,
        * "data": [
                    {
                        "firstName": "string",
                        "lastName": "string",
                        "country": "string",
                        "countryCode": "string",
                        "mobileNumber": number,
                        "createdOn": "date",
                        "userId": "string",
                        "email": "string",
                        "friends": []
                    },
                    .........
                ]
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": false,
        * "message": "No Friends Found,
        * "status": 404,
        * "data": null
        * }
     */
    
     // params: userId
     app.get(`${baseUrl}/get/received/notifications`, notificationController.getAllReceivedNotifications)
     /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/friends/get/received/notifications Get All Users received Notifications
     * @apiVersion 0.0.1
     * @apiGroup Friends
     * 
     * @apiParam {string} userId userId of the user. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All User Received Notifications Found",
        * "status": 200,
        * "data": [
                    {
                        "senderId": "string",
                        "receiverId": "string",
                        "message": "string",
                        "seen": boolean,
                        "_id": "string",
                        "notificationId": "string",
                        "notifiedOn": "date",
                        "__v": 0
                    },
                    .........
                ]
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": false,
        * "message": "No User Notifications Found,
        * "status": 404,
        * "data": null
        * }
     */

     //params: userId
     app.get(`${baseUrl}/get/sent/notifications`, notificationController.getAllSentNotifications)
     /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/friends/get/sent/notifications Get All Users Sent Notifications
     * @apiVersion 0.0.1
     * @apiGroup Friends
     * 
     * @apiParam {string} userId userId of the user. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All User Sent Notifications Found",
        * "status": 200,
        * "data": [
                    {
                        "senderId": "string",
                        "receiverId": "string",
                        "message": "string",
                        "seen": boolean,
                        "_id": "string",
                        "notificationId": "string",
                        "notifiedOn": "date",
                        "__v": 0
                    },
                    .........
                ]
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": false,
        * "message": "No User Notifications Found",
        * "status": 404,
        * "data": null
        * }
     */

     app.post(`${baseUrl}/delete/notification`, notificationController.deleteNotification)
     /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/friends/delete/notification Delete A particular Notifications
     * @apiVersion 0.0.1
     * @apiGroup Friends
     * 
     * @apiParam {string} notificationId notificationId of the notification. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Notification Found",
        * "status": 200,
        * "data": { 
        *           "n": 1,
                    "ok": 1,
                    "deletedCount": 1
        *       }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": false,
        * "message": "No Notification Found",
        * "status": 404,
        * "data": null
        * }
     */
            
} // end set Router

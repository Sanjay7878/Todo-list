const appConfig = require('../../appConfig/appConfig')
const toDoController = require('../appController/toDoController')

const auth = require('../middleware/auth')

// function to set up the routing in the application
module.exports.setRouter = (app) =>  {

    let baseUrl = `${appConfig.apiVersion}/toDo`

    //params: userId, listName, visibility(public, private)
    app.post(`${baseUrl}/create`, toDoController.createToDo)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/toDo/create Create New ToDo List
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} listName list name of the ToDo List. (body params) (required)
     * @apiParam {string} visibility visibility of the List (Public or Private) (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "ToDo-List Created Succesfully",
        * "status": 200,
        * "data": {
                "listName": "string",
                "createdBy": "string",
                "modifiedOn": "date",
                "createdOn": "date",
                "visibility": "string",
                "_id": "string",
                "listId": "string",
                "userId": "string",
                "__v": 0
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to Save To Do List",
        * "status": 500,
        * "data": null
        * }
     */


    //params: userId
    app.get(`${baseUrl}/get-all/user/todolist`, toDoController.getAllUserCreatedList)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/toDo/get-all/user/todolist Get All User ToDo Lists
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} userId userId of the user. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All User ToDo List Found",
        * "status": 200,
        * "data": {
                "listName": "string",
                "createdBy": "string",
                "modifiedOn": "date",
                "createdOn": "date",
                "visibility": "string",
                "listId": "string",
                "userId": "string"
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No ToDo Lists Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: listId
    app.get(`${baseUrl}/get/todo`, toDoController.getSingleToDoList)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/toDo/get/todo Get Single ToDo List
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} skip skip count. (query params) (required)
     * @apiParam {string} listId listId of the ToDo List. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "ToDo List Found",
        * "status": 200,
        * "data": {
                "listName": "string",
                "createdBy": "string",
                "modifiedOn": "date",
                "createdOn": "date",
                "visibility": "string",
                "listId": "string",
                "userId": "string"
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No ToDo List Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: listId, listName, visibility(public, private)
    app.put(`${baseUrl}/edit/todolist`, toDoController.editUserToDoList)
    /**
     * @api {put} http://todo.sanjayinfotechy.com/api/v1/toDo/edit/todolist Edit Particular User ToDo Lists
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} listId listId of the ToDo List. (body params) (required)
     * @apiParam {string} listName list name of the ToDo List. (body params) (required)
     * @apiParam {string} visibility visibility of the List (Public or Private) (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "ToDo List Updated Successfully",
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
        * "message": "No ToDo List Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: listId
    app.post(`${baseUrl}/delete/todolist`, toDoController.deleteUserToDoList)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/toDo/delete/todolist Delete Particular User ToDo Lists
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} listId listId of the ToDo List. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "ToDo List Deleted Successfully",
        * "status": 200,
        * "data": { 
        *       "n": 1,
                "ok": 1,
                "deletedCount": 1
        *   }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No ToDo List Found",
        * "status": 404,
        * "data": null
        * }
     */


    //Api for tasks

    //params: listId, taskName
    app.post(`${baseUrl}/create/task`, toDoController.createListTask)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/toDo/create/task Create New Task For A ToDo List
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} listId listId of the toDo list. (body params) (required)
     * @apiParam {string} taskName task name of the task. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "ToDo-Task Created Succesfully",
        * "status": 200,
        * "data": {
                "taskId": "string",
                "taskCreatedOn": "date",
                "taskModifiedOn": "date",
                "status": "string",
                "_id": "string",
                "listId": "string",
                "taskName": "string",
                "__v": 0
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed To Save Task Details",
        * "status": 500,
        * "data": null
        * }
     */

    //params: listId, skip
    app.get(`${baseUrl}/all/todo/tasks`, toDoController.getAllListTasks)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/toDo/all/todo/tasks Get All Task Of A ToDo List
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} skip skip count. (query params) (required)
     * @apiParam {string} listId listId of the toDo list. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Tasks Found",
        * "status": 200,
        * "data": {
                "listName": "string",
                "createdBy": "string",
                "modifiedOn": "date",
                "createdOn": "date",
                "visibility": "string",
                "listId": "string",
                "userId": "string"
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No ToDo Lists Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: listId, taskId, taskName
    app.put(`${baseUrl}/edit/task`, toDoController.editListTask)
    /**
     * @api {put} http://todo.sanjayinfotechy.com/api/v1/toDo/edit/task Edit Particular ToDo Task
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} listId listId of the ToDo List. (body params) (required)
     * @apiParam {string} taskId taskId of the ToDo Task. (body params) (required)
     * @apiParam {string} taskName taskName of the ToDo Task (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Task Updated Successfully",
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
        * "message": "No Task Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: taskId, status
    app.put(`${baseUrl}/change/task/status`,toDoController.changeTaskStatus)
    /**
     * @api {put} http://todo.sanjayinfotechy.com/api/v1/toDo/change/task/status Change Status OF A Particular ToDo Task
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} taskId taskId of the ToDo Task. (body params) (required)
     * @apiParam {string} status status of the ToDo Task (open or done) (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Task Status Updated",
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
        * "message": "No Task Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: listId, taskId
    app.post(`${baseUrl}/delete/task`, toDoController.deleteListTask)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/toDo/delete/task Delete A Particular ToDo Task
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} listId listId of the ToDo List  (required)
     * @apiParam {string} taskId taskId of the ToDo Task. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Task Deleted Successfully,
        * "status": 200,
        * "data": { 
        *       "n": 1,
                "ok": 1,
                "deletedCount": 1
        *   }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Task Found",
        * "status": 404,
        * "data": null
        * }
     */


    //Api for Sub Task
    
    //params: taskId, subTaskName
    app.post(`${baseUrl}/create/sub/task`, toDoController.createSubTask)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/toDo/create/sub/task Create New Sub-Task For A Task
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} taskId taskId of the toDo task. (body params) (required)
     * @apiParam {string} subTaskName sub-task name for the sub-task. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "SubTask Created Succesfully",
        * "status": 200,
        * "data": {
                "subTaskId": "string",
                "listId": "string",
                "subTaskCreatedOn": "date",
                "subTaskModifiedOn": "date",
                "status": "string",
                "_id": "string",
                "taskId": "string",
                "subTaskName": "string",
                "__v": 0
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to Save Sub Task Details",
        * "status": 500,
        * "data": null
        * }
     */

    //params: taskId, skip
    app.get(`${baseUrl}/get/sub/tasks`, toDoController.getAllSubTasks)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/toDo/get/sub/tasks Get All Sub-Tasks Of A Particaular Task
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} taskId taskId of the toDo task. (query params) (required)
     * @apiParam {string} skip skip count. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Sub Tasks Found",
        * "status": 200,
        * "data": {
                "subTaskId": "string",
                "listId": "string",
                "subTaskCreatedOn": "date",
                "subTaskModifiedOn": "date",
                "status": "string",
                "taskId": "string",
                "subTaskName": "string"
            }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Sub Tasks Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: subTaskId, subTaskName
    app.put(`${baseUrl}/edit/sub/task`, toDoController.editSubTask)
    /**
     * @api {put} http://todo.sanjayinfotechy.com/api/v1/toDo/edit/sub/task Edit A Particular Sub-Task
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} taskId taskId of that Task (body params) (required)
     * @apiParam {string} subTaskId subTaskId of the Sub-Task. (body params) (required)
     * @apiParam {string} subTaskName sub-task name of the Sub-Task (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Sub Task Updated Successfully",
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
        * "message": "No Sub Task Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: subTaskId, status
    app.put(`${baseUrl}/change/subtask/status`,toDoController.changeSubTaskStatus)
    /**
     * @api {put} http://todo.sanjayinfotechy.com/api/v1/toDo/change/subtask/status Change Status Of A Particular Sub-Task
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} taskId taskId of that Task (body params) (required)
     * @apiParam {string} subTaskId subTaskId of the Sub-Task. (body params) (required)
     * @apiParam {string} status status name of the Sub-Task (open or done) (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Sub Task Status Updated",
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
        * "message": "No Sub Task Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: subTaskId, taskId
    app.post(`${baseUrl}/delete/sub/task`, toDoController.deleteSubTask)
    /**
     * @api {post} http://todo.sanjayinfotechy.com/api/v1/toDo/delete/sub/task Delete A Particular Sub-Task
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} taskId TaskId of that Task (body params) (required)
     * @apiParam {string} subTaskId subTaskId of the Sub-Task. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Sub Task Deleted Successfully",
        * "status": 200,
        * "data": { 
        *       "n": 1,
                "ok": 1,
                "deletedCount": 1
        *   }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Sub Task Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: listId
    app.get(`${baseUrl}/get/todo/history`, toDoController.getALLToDoHistory)
    /**
     * @api {get} http://todo.sanjayinfotechy.com/api/v1/toDo/get/todo/history Get All History Of A Particular ToDo List
     * @apiVersion 0.0.1
     * @apiGroup ToDo
     * 
     * @apiParam {string} listId listId of the ToDo List. (query params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Todo History",
        * "status": 200,
        * "data": {
                "toDoListID": "string",
                "toDoListName": "string",
                "toDolistVisibility": "string",
                "editedToDoListName": "string",
                "editedToDoVisibility": "string",
                "taskId": "string",
                "taskName": "string",
                "status": "string",
                "editTaskName": "string",
                "editStatus": "string",
                "subTaskId": "string",
                "subTaskName": "string",
                "subTaskStatus": "string",
                "editSubTaskName": "string",
                "editSubTaskStatus": "string",
                "createdOn": "date",
                "modifiedOn": "date",
                "used": boolean,
                "historyId": "string",
                "action": "string"
            },
            ............
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No History Found",
        * "status": 404,
        * "data": null
        * }
     */

} // end setRouter
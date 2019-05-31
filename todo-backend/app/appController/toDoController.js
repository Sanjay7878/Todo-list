const mongoose = require('mongoose')
const shortid = require('shortid')


/*Libraries*/
const check = require('../libs/check')
const response = require('../libs/response')
const logger = require('../libs/logger')
const time = require('../libs/timeLib')


/*Models*/
const UserModel = mongoose.model('User') 
const ToDoModel = mongoose.model('ToDo')
const TaskModel = mongoose.model('Task')
const SubTaskModel = mongoose.model('SubTask')
const HistoryModel = mongoose.model('ToDoHistory')
/**
 * 
 * To Do List Controllers
 * 
 */

let listId;
let taskId

let createToDo = (req, res)=>{

    let findUser = ()=>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId: req.body.userId}, (err, userDetails)=>{
                if(err){
                    logger.error(err, " toDoController: createToDo, findUser", 8)
                    let apiResponse = response.generate(true, "Failed to Find User Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(userDetails)){
                    logger.error("No User Found", " toDoController: createToDo, findUser", 8)
                    let apiResponse = response.generate(true, "No User Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(userDetails)
                }
            })
        })
    } // end find user

    let createNewToDo = (user) =>{
        return new Promise((resolve, reject)=>{
            if(!req.body.listName){
                logger.error("listName parameter is missing", "toDoController: createToDo, createNewToDo", 8)
                let apiResponse = response.generate(true, "listName parameter is missing", 400,  null)
                reject(apiResponse)
            } else {
                let newToDo = new ToDoModel({
                    listId: shortid.generate(),
                    listName: req.body.listName,
                    createdBy: user.firstName+' '+user.lastName,
                    userId: req.body.userId,
                    createdOn: time.now(),
                    modifiedOn: time.now(),
                    visibility: req.body.visibility,
                })

                newToDo.save((err, result)=>{
                    if(err){
                        logger.error(err, "toDoController: createToDo, createNewToDo", 8)
                        let apiResponse = response.generate(true, "Failed to Save To Do List", 500, null)
                        reject(apiResponse)
                    } else {
                        let newToDoObj = result.toObject()
                        resolve(newToDoObj)
                    }
                })
            }
        })
    } // end create new to do

    findUser(req, res)
        .then(createNewToDo)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'ToDo-List Created Succesfully', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })

} // end create to do

let getAllUserCreatedList = (req, res)=>{
    if(req.body.userId || req.query.userId){
        ToDoModel.find({userId: req.body.userId || req.query.userId})
            .select("-__v -_id")
            .skip(parseInt(req.body.skip) || 0)
            .limit(5)
            .lean()
            .exec((err, allTasks)=>{
                if(err){
                    logger.error(err, "toDoController: getAllUserCreatedList", 8)
                    let apiResponse = response.generate(true, "Failed to Find All ToDo List Details", 500, null)
                    res.send(apiResponse)
                } else if(check.isEmpty(allTasks)){
                    logger.error("No ToDo Lists Found", " toDoController: getAllUserCreatedList", 8)
                    let apiResponse = response.generate(true, "No ToDo Lists Found", 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, "All User ToDo List Found", 200, allTasks)
                    res.send(apiResponse)
                }
            })
    } else {
        logger.error("'userId' parameter is missing", " toDoController: getAllUserCreatedList", 8)
        let apiResponse = response.generate(true, "userId' parameter is missing", 400, null)
        res.send(apiResponse)
    }
} // end get all user created list

let getSingleToDoList = (req, res)=>{
    if(req.body.listId || req.query.listId){
        ToDoModel.findOne({listId: req.body.listId || req.query.listId})
            .select('-__v -_id')
            .skip(parseInt(req.body.skip) || 0)
            .limit(5)
            .lean()
            .exec((err, todoList)=>{
                if(err){
                    logger.error(err, "toDoController: getSingleToDoList", 8)
                    let apiResponse = response.generate(true, "Failed to Find All ToDo List Details", 500, null)
                    res.send(apiResponse)
                } else if(check.isEmpty(todoList)){
                    logger.error("No ToDo List Found", " toDoController: getSingleToDoList", 8)
                    let apiResponse = response.generate(true, "No ToDo List Found", 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, "ToDo List Found", 200, todoList)
                    res.send(apiResponse)
                }
            })
    }
} // end get single todoList

let editUserToDoList =(req, res)=>{
    let options = {
        listName: req.body.listName,
        visibility: req.body.visibility,
        modifiedOn: time.now()
    }

    ToDoModel.findOneAndUpdate({listId: req.body.listId}, options, {multi: true}, (err, result)=>{
        if(err){
            logger.error(err, "toDoController: editUserToDoList", 8)
            let apiResponse = response.generate(true, "Failed to Find ToDo List", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)){
            logger.error("No ToDo List Found", " toDoController: editUserToDoList", 8)
            let apiResponse = response.generate(true, "No ToDo List Found", 404, null)
            res.send(apiResponse)
        } else {
            let newHistory = new HistoryModel({
                historyId: shortid.generate(),
                action: 'ToDo List Edited',
                toDoListID: req.body.listId,
                toDoListName: result.listName,
                toDolistVisibility: result.visibility,
                editedToDoListName: req.body.listName,
                editedToDoVisibility: req.body.visibility
            })
            
            newHistory.save()
            let apiResponse = response.generate(false, "ToDo List Updated Successfully", 200, null)
            res.send(apiResponse)
        }
    })
} // end edit user todo list

let deleteUserToDoList = (req, res) =>{

    let deleteToDoList = () =>{
        return new Promise((resolve, reject)=>{
            ToDoModel.findOneAndDelete({listId: req.body.listId}, (err, result)=>{
                if(err){
                    logger.error(err, "toDoController: deleteUserToDoList, deleteToDoList", 8)
                    let apiResponse = response.generate(true, "Failed to Find ToDo List", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(result)){
                    logger.error("No ToDo List Found", " toDoController: deleteUserToDoList", 8)
                    let apiResponse = response.generate(true, "No ToDo List Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve()
                }
            })
        })
    } // end delete Todo list

    let deleteAllTaskModel = () =>{
        return new Promise((resolve, reject)=>{
            TaskModel.deleteMany({listId: req.body.listId}, (err, result)=>{
                if(err){
                    logger.error(err, "toDoController: deleteUserToDoList, deleteAllTaskModel", 8)
                    let apiResponse = response.generate(true, "Failed to Delete List Task", 500, null)
                    reject(apiResponse)
                } else{
                    resolve()
                }
            })
        })
    } // end delete all task models

    let deleteAllSubTask = ()=>{
        return new Promise((resolve, reject)=>{
            SubTaskModel.deleteMany({listId: req.body.listId}, (err, result)=>{
                if(err){
                    logger.error(err, "toDoController: deleteUserToDoList, deleteAllSubTask", 8)
                    let apiResponse = response.generate(true, "Failed to Delete Sub Task", 500, null)
                    reject(apiResponse)
                } else{
                    resolve()
                }
            })
        })
    } // end delete all sub Tasks
            
    let allTaskHistory =  () =>{
        return new Promise((resolve, reject)=>{
            HistoryModel.deleteMany({toDoListID: req.body.listId}, (err, result)=>{
                if(err){
                    logger.error(err, "toDoController: deleteUserToDoList, allTaskHistory", 8)
                    let apiResponse = response.generate(true, "Failed to Delete List Task", 500, null)
                    reject(apiResponse)
                } else{
                    resolve()
                }
            })
        })
    } // end delete all task history

    allTaskHistory(req, res)
        .then(deleteAllSubTask)
        .then(deleteAllTaskModel)
        .then(deleteToDoList)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "ToDo List Deleted Successfully", 400, null)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    
} // end delete user to do list

/**
 * 
 * End To Do List Controllers
 * 
 */

 /**
 * 
 * Task Controllers
 * 
 */

let createListTask = (req, res)=>{

    let findList = ()=>{
        return new Promise((resolve, reject)=>{
            ToDoModel.findOne({listId: req.body.listId}, (err, listDetails)=>{
                if(err){
                    logger.error(err, "toDoController: createListTask, findList", 6)
                    let apiResponse = response.generate(true, "Failed to Find ToDo List Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(listDetails)){
                    logger.error("No ToDo List Found", "toDoController: createListTask, findList", 6)
                    let apiResponse = response.generate(true, "No ToDo List Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(listDetails)
                }
            })
        })
    } // end findlist

    let createTask = (listDetails)=>{
        return new Promise((resolve, reject)=>{
            if(req.body.taskName){
                let taskId = shortid.generate()
                let newTask = new TaskModel({
                    taskId: taskId,
                    listId: listDetails.listId,
                    taskName: req.body.taskName,
                    taskCreatedOn: time.now(),
                    taskModifiedOn: time.now()
                })
                let historyId = shortid.generate()
                let newHistory = new HistoryModel({
                    historyId: historyId,
                    action: `New Task Created for ${historyId}`,
                    toDoListID: req.body.listId,
                    taskId: taskId,
                    taskName : req.body.taskName,
                    createdOn: time.now(),
                    modifiedOn: time.now(),
                    used: false
                })

                newTask.save((err, result)=>{
                    if(err){
                        logger.error(err, "toDoController: createListTask, createTask", 6)
                        let apiResponse = response.generate(true, "Failed To Save Task Details" , 500, null)
                        reject(apiResponse)
                    } else {
                        console.log(newHistory)
                        newHistory.save()
                        let toDoTaskObj = result.toObject()
                        resolve(toDoTaskObj)
                    }
                })
            } else {
                logger.error(" 'taskName' parameter is missing", "toDoController: createListTask, createTask", 6)
                let apiResponse = response.generate(true, "'taskName' parameter is missing", 400, null)
                reject(apiResponse)
            }
            
        })
    } // end createTask

    findList(req, res)
        .then(createTask)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'ToDo-Task Created Succesfully', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })

} // end create list Task

let getAllListTasks = (req, res)=>{
    if(req.body.listId || req.query.listId){
        TaskModel.find({listId: req.body.listId || req.query.listId})
            .select('-__v -_id')
            .skip(parseInt(req.body.skip) || 0)
            .limit(5)
            .lean()
            .exec((err, listDetails)=>{
                if(err){
                    logger.error(err, "toDoController: getAllListTasks", 6)
                    let apiResponse = response.generate(true, "Failed to Find ToDo List Details", 500, null)
                    res.send(apiResponse)
                } else if(check.isEmpty(listDetails)){
                    logger.error("No ToDo List Found", "toDoController: getAllListTasks", 6)
                    let apiResponse = response.generate(true, "No ToDo List Found", 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse =response.generate(false, "All Tasks Found", 200, listDetails)
                    res.send(apiResponse)
                }
            })
    } else {
        logger.error(" 'listId' parameter is missing", "toDoController: getAllListTasks", 5)
        let apiResponse = response.generate(true, "'listId' parameter is missing", 400, null)
        res.send(apiResponse)
    }
} // end get all list tasks

let editListTask = (req, res) =>{

    let findList = ()=>{
        return new Promise((resolve, reject)=>{
            ToDoModel.findOne({listId: req.body.listId}, (err, listDetails)=>{
                if(err){
                    logger.error(err, "toDoController: editListTask, findList", 6)
                    let apiResponse = response.generate(true, "Failed to Find ToDo List Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(listDetails)){
                    logger.error("No ToDo List Found", "toDoController: editListTask, findList", 6)
                    let apiResponse = response.generate(true, "No ToDo List Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(listDetails)
                }
            })
        })
    } // end findlist

    let findTask = ()=>{
        return new Promise((resolve, reject)=>{
            TaskModel.findOne({taskId: req.body.taskId}, (err, taskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: editListTask, findTask", 6)
                    let apiResponse = response.generate(true, "Failed to Find ToDo List Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(taskDetails)){
                    logger.error("No Task Found", "toDoController: editListTask, findTask", 6)
                    let apiResponse = response.generate(true, "No Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(taskDetails)
                }
            })
        })
    } // end find task

    let updateTask = (taskDetails) =>{
        return new Promise((resolve, reject)=>{
            let newHistory = new HistoryModel({
                historyId: shortid.generate(),
                toDoListID: req.body.listId,
                action: 'Task Edited',
                taskId: req.body.taskId,
                taskName: taskDetails.taskName,
                editTaskName : req.body.taskName,
                editStatus: req.body.status,
                createdOn: time.now(),
                modifiedOn: time.now(),
                used: false
            })

            let options = {
                taskName: req.body.taskName
            }
 
            TaskModel.updateOne({taskId: req.body.taskId}, options, {multi: true}, (err, result)=>{
                if(err){
                    logger.error(err, "toDoController: editListTask, updateTask", 5)
                    let apiResponse = response.generate(true, "Failed to Find Task", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(result)){
                    logger.error("No Task Found", " toDoController: editListTask, updateTask", 5)
                    let apiResponse = response.generate(true, "No Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    newHistory.save()
                    resolve(result)
                }
            })
        })
    } // end update Task

    findList(req, res)
        .then(findTask)
        .then(updateTask)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Task Updated Successfully", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    
} // end edit list Task

let changeTaskStatus = (req, res)=>{

    let findTask = ()=>{
        return new Promise((resolve, reject)=>{
            TaskModel.findOne({taskId: req.body.taskId}, (err, taskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: changeTaskStatus, findList", 6)
                    let apiResponse = response.generate(true, "Failed to Find ToDo List Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(taskDetails)){
                    logger.error("No ToDo Task Found", "toDoController: changeTaskStatus, findList", 6)
                    let apiResponse = response.generate(true, "No ToDo Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(taskDetails)
                }
            })
        })
    } // end findlist

    let changeStatus = (taskDetails)=>{
        return new Promise((resolve, reject)=>{
            let newHistory = new HistoryModel({
                historyId: shortid.generate(),
                toDoListID: taskDetails.listId,
                action: 'Task Status Changed',
                taskId: req.body.taskId,
                editStatus: req.body.status,
                createdOn: time.now(),
                modifiedOn: time.now(),
                used: false
            })
        
            let options =  {
                status: req.body.status
            }
        
            TaskModel.updateOne({taskId: req.body.taskId}, options, (err, result)=>{
                if(err){
                    logger.error(err, "toDoController: changeTaskStatus, changeStatus", 5)
                    let apiResponse = response.generate(true, "Failed to Change Task Status", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(result)){
                    logger.error("No Task Found", " toDoController: changeTaskStatus, changeStatus", 5)
                    let apiResponse = response.generate(true, "No Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    newHistory.save()
                    resolve(result)
                }
            })
        })
    } // end change status

    findTask(req, res)
        .then(changeStatus)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Task Status Updated", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    
} // end change status

let deleteListTask = (req, res) =>{

    let findList = ()=>{
        return new Promise((resolve, reject)=>{
            ToDoModel.findOne({listId: req.body.listId}, (err, listDetails)=>{
                if(err){
                    logger.error(err, "toDoController: deleteListTask, findList", 6)
                    let apiResponse = response.generate(true, "Failed to Find ToDo List Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(listDetails)){
                    logger.error("No ToDo List Found", "toDoController: deleteListTask, findList", 6)
                    let apiResponse = response.generate(true, "No ToDo List Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(listDetails)
                }
            })
        })
    } // end findlist

    let deleteTask = (listDetails) => {
        return new Promise((resolve, reject)=>{
            if(check.isEmpty(req.body.taskId)){
                logger.error("'taskId' is missing", "toDoController: deleteListTask, deleteTask", 5)
                let apiResponse = response.generate(true, "'taskId' is missing", 400, null)
                reject(apiResponse)
            } else {
                let newHistory = new HistoryModel({
                    historyId: shortid.generate(),
                    toDoListID: listDetails.listId,
                    action: 'Task Deleted',
                    taskId: req.body.taskId,
                    createdOn: time.now(),
                    modifiedOn: time.now(),
                    used: false
                })

                TaskModel.findOneAndDelete({taskId: req.body.taskId}, (err, result)=>{
                    if(err){
                        logger.error(err, "toDoController: deleteListTask, deleteTask", 8)
                        let apiResponse = response.generate(true, "Failed to find Task Details", 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(result)){
                        logger.error("No Task Found", " toDoController: deleteListTask, deleteTask", 8)
                        let apiResponse = response.generate(true, "No Task Found", 404, null)
                        reject(apiResponse)
                    } else {
                        newHistory.taskName = result.taskName
                        newHistory.save()
                        resolve(result)
                    }
                })
            }
        })
    } // end delete task

    let deleteAllSubTask = () =>{
        return new Promise((resolve, reject)=>{
            SubTaskModel.deleteMany({taskId: req.body.taskId}, (err, result)=>{
                if(err){
                    logger.error(err, "toDoController: deleteListTask, deleteAllSubTask", 8)
                    let apiResponse = response.generate(true, "Failed to find Task Details", 500, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            })
        })
    } // end delete all sub task

    findList(req, res)
        .then(deleteTask)
        .then(deleteAllSubTask)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Task Deleted Successfully", 200, null)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    
} // end delete list task

/**
 * 
 * End Task Controllers
 * 
 */

/**
 * 
 * Sub Task Controllers
 * 
 */

let createSubTask = (req, res)=>{

    let findTask = ()=>{
        return new Promise((resolve, reject)=>{
            TaskModel.findOne({taskId: req.body.taskId}, (err, taskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: createSubTask, findTask", 6)
                    let apiResponse = response.generate(true, "Failed to Find Task Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(taskDetails)){
                    logger.error("No Task Found", "toDoController: createSubTask, findTask", 6)
                    let apiResponse = response.generate(true, "No Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(taskDetails)
                }
            })
        })
    } // end findTask

    let saveSubTask = (taskDetails)=>{
        return new Promise((resolve, reject)=>{
            if(req.body.subTaskName){
                let subTaskId = shortid.generate()
                let newSubTask = new SubTaskModel({
                    subTaskId: subTaskId,
                    listId: taskDetails.listId,
                    taskId: taskDetails.taskId,
                    subTaskName: req.body.subTaskName,
                    subTaskCreatedOn: time.now(),
                    subTaskModifiedOn: time.now()
                })

                let newHistory = new HistoryModel({
                    historyId: shortid.generate(),
                    toDoListID: taskDetails.listId,
                    action: 'New Sub-Task Created',
                    subTaskId: subTaskId,
                    subTaskName : req.body.subTaskName,
                    taskId: taskDetails.taskId,
                    createdOn: time.now(),
                    modifiedOn: time.now(),
                    used: false
                })

                newSubTask.save((err, result)=>{
                    if(err){
                        logger.error(err, "toDoController: createSubTask, saveSubTask", 6)
                        let apiResponse = response.generate(true, "Failed to Save Sub Task Details", 400, null)
                        reject(apiResponse)
                    } else{
                        newHistory.save()
                        resolve(result)
                    }
                })
            } else {
                logger.error(" 'subTaskName' parameter is missing", "toDoController: createSubTask, saveSubTask", 6)
                let apiResponse = response.generate(true, "'subTaskName' parameter is missing", 400, null)
                reject(apiResponse)
            }
            
        })
    } // end createTask

    findTask(req, res)
        .then(saveSubTask)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'SubTask Created Succesfully', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })

} // end create list Task

let getAllSubTasks = (req, res)=>{
    if(req.body.taskId || req.query.taskId){
        SubTaskModel.find({taskId: req.body.taskId || req.query.taskId})
            .select('-__v -_id')
            .skip(parseInt(req.body.skip) || 0)
            .limit(5)
            .lean()
            .exec((err, subTaskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: getAllSubTasks", 5)
                    let apiResponse = response.generate(true, "Failed to Find Sub Task Details", 500, null)
                    res.send(apiResponse)
                } else if(check.isEmpty(subTaskDetails)){
                    logger.error("No Sub Tasks Found", "toDoController: getAllSubTasks", 5)
                    let apiResponse = response.generate(true, "No Sub Tasks Found", 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse =response.generate(false, "All Sub Tasks Found", 200, subTaskDetails)
                    res.send(apiResponse)
                }
            })
    } else {
        logger.error(" 'taskId' parameter is missing", "toDoController: getAllSubTasks", 5)
        let apiResponse = response.generate(true, "'taskId' parameter is missing", 400, null)
        res.send(apiResponse)
    }
} // end get all list tasks

let editSubTask = (req, res) =>{

    let findTask = ()=>{
        return new Promise((resolve, reject)=>{
            TaskModel.findOne({taskId: req.body.taskId}, (err, taskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: editSubTask, findTask", 6)
                    let apiResponse = response.generate(true, "Failed to Find Task Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(taskDetails)){
                    logger.error("No Task Found", "toDoController: editSubTask, findTask", 6)
                    let apiResponse = response.generate(true, "No Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    listId = taskDetails.listId
                    resolve(taskDetails)
                }
            })
        })
    } // end findTask

    let findSubTask = () =>{
        return new Promise((resolve, reject)=>{
            SubTaskModel.findOne({subTaskId: req.body.subTaskId}, (err, subTaskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: editSubTask, findSubTask", 6)
                    let apiResponse = response.generate(true, "Failed to Find Sub Task Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(subTaskDetails)){
                    logger.error("No Sub Task Found", "toDoController: editSubTask, findSubTask", 6)
                    let apiResponse = response.generate(true, "No Sub Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(subTaskDetails)
                }
            })
        })
    } // end find Sub Task

    let update = (subTaskDetails) =>{
        return new Promise((resolve, reject)=>{
            console.log(subTaskDetails)
            if(req.body.subTaskName){
                let options = {
                    subTaskName: req.body.subTaskName
                }

                let newHistory = new HistoryModel({
                    historyId: shortid.generate(),
                    action: 'Task Edited',
                    toDoListID: listId,
                    taskId: req.body.taskId,
                    subTaskName: subTaskDetails.subTaskName,
                    editSubTaskName : req.body.subTaskName,
                    createdOn: time.now(),
                    modifiedOn: time.now(),
                    used: false
                })

                SubTaskModel.update({subTaskId: req.body.subTaskId}, options, (err, result)=>{
                    if(err){
                        logger.error(err, "toDoController: editSubTask, update", 6)
                        let apiResponse = response.generate(true, "Failed to Find Task Details", 500, null)
                        reject(apiResponse)
                    }else {
                        newHistory.save()
                        resolve(result)
                    }
                })
            } else {
                logger.error("'subTaskName' parameter is missing", "toDoController: editSubTask, update", 6)
                let apiResponse = response.generate(true, "'subTaskName' parameter is missing", 404, null)
                reject(apiResponse)
            }
            
        })
    } // end update

    findTask(req, res)
        .then(findSubTask)
        .then(update)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Sub Task Updated Successfully", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    
} // end edit list Task

let changeSubTaskStatus = (req, res)=>{
    
    let findTask = ()=>{
        return new Promise((resolve, reject)=>{
            TaskModel.findOne({taskId: req.body.taskId}, (err, taskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: changeSubTaskStatus, findTask", 6)
                    let apiResponse = response.generate(true, "Failed to Find Task Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(taskDetails)){
                    logger.error("No Task Found", "toDoController: changeSubTaskStatus, findTask", 6)
                    let apiResponse = response.generate(true, "No Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    listId = taskDetails.listId
                    resolve(taskDetails)
                }
            })
        })
    } // end findTask

    let findSubTask = (taskDetails)=>{
        return new Promise((resolve, reject)=>{
            SubTaskModel.findOne({subTaskId: req.body.subTaskId}, (err, subTaskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: changeSubTaskStatus, findSubTask", 6)
                    let apiResponse = response.generate(true, "Failed to Find Sub Task Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(subTaskDetails)){
                    logger.error("No Sub Task Found", "toDoController: changeSubTaskStatus, findSubTask", 6)
                    let apiResponse = response.generate(true, "No Sub Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    taskId = taskDetails.taskId
                    resolve(subTaskDetails)
                }
            })
        })
    } // end find Sub Task

    let changeStatus = (subTaskDetails) =>{
        return new Promise((resolve, reject)=>{
            let options = {
                status: req.body.status
            }
        
            let newHistory = new HistoryModel({
                historyId: shortid.generate(),
                toDoListID: listId,
                taskId: taskId,
                action: 'Sub-Task Status Changed',
                subTaskStatus: subTaskDetails.status,
                subTaskId: req.body.subTaskId,
                editSubTaskStatus: req.body.status,
                createdOn: time.now(),
                modifiedOn: time.now(),
                used: false
            })
        
            SubTaskModel.updateOne({subTaskId: req.body.subTaskId}, options, (err, result)=>{
                if(err){
                    logger.error(err, "toDoController: changeSubTaskStatus", 5)
                    let apiResponse = response.generate(true, "Failed to Change Task Status", 500, null)
                    reject(apiResponse)
                }else {
                    newHistory.save()
                    resolve(result)
                }
            })
        })
    } // end change Status

    findTask(req, res)
        .then(findSubTask)
        .then(changeStatus)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Sub Task Status Updated", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
} // end change sub task status
    
let deleteSubTask = (req, res) =>{

    let findTask = ()=>{
        return new Promise((resolve, reject)=>{
            TaskModel.findOne({taskId: req.body.taskId}, (err, taskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: deleteSubTask, findTask", 6)
                    let apiResponse = response.generate(true, "Failed to Find Task Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(taskDetails)){
                    logger.error("No Task Found", "toDoController: deleteSubTask, findTask", 6)
                    let apiResponse = response.generate(true, "No Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    listId = taskDetails.listId
                    resolve(taskDetails)
                }
            })
        })
    } // end findTask

    let findSubTask = (taskDetails) =>{
        return new Promise((resolve, reject)=>{
            SubTaskModel.findOne({subTaskId: req.body.subTaskId}, (err, subTaskDetails)=>{
                if(err){
                    logger.error(err, "toDoController: deleteSubTask, findSubTask", 6)
                    let apiResponse = response.generate(true, "Failed to Find Sub Task Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(subTaskDetails)){
                    logger.error("No Sub Task Found", "toDoController: deleteSubTask, findSubTask", 6)
                    let apiResponse = response.generate(true, "No Sub Task Found", 404, null)
                    reject(apiResponse)
                } else {
                    taskId = taskDetails.taskId
                    resolve(subTaskDetails)
                }
            })
        })
    } // end find Sub Task
    
    let remove = (subTaskDetails)=>{
        return new Promise((resolve, reject)=>{
            if(req.body.subTaskId){
                let newHistory = new HistoryModel({
                    historyId: shortid.generate(),
                    toDoListID: listId,
                    taskId: taskId,
                    action: 'Sub-Task Deleted',
                    subTaskId: req.body.subTaskId,
                    subTaskName: subTaskDetails.subTaskName,
                    createdOn: time.now(),
                    modifiedOn: time.now(),
                    used: false
                })
                SubTaskModel.deleteOne({subTaskId: req.body.subTaskId}, (err, result)=>{
                    if(err){
                        logger.error(err, "toDoController: deleteSubTask, remove", 8)
                        let apiResponse = response.generate(true, "Failed to Find Sub Task", 500, null)
                        reject(apiResponse)
                    } else {
                        newHistory.save()
                        resolve(result)
                    }
                })
            } else {
                logger.error("'subTaskId' is missing", "toDoController: deleteSubTask, remove", 5)
                let apiResponse = response.generate(true, "'subTaskId' is missing", 400, null)
                reject(apiResponse)
            }
        })
    } // end remove subTask

    findTask(req, res)
        .then(findSubTask)
        .then(remove)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Sub Task Deleted Successfully", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    
} // end delete list task

/**
* 
* End Sub Task Controllers
* 
*/

let getALLToDoHistory = (req, res) =>{
    let findList = ()=>{
        return new Promise((resolve, reject)=>{
            ToDoModel.findOne({listId: req.body.listId || req.query.listId}, (err, listDetails)=>{
                if(err){
                    logger.error(err, "toDoController: getALLToDoHistory, findList", 6)
                    let apiResponse = response.generate(true, "Failed to Find ToDo List Details", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(listDetails)){
                    logger.error("No ToDo List Found", "toDoController: getALLToDoHistory, findList", 6)
                    let apiResponse = response.generate(true, "No ToDo List Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(listDetails)
                }
            })
        })
    } // end findlist

    let findHistory = (listDetails)=>{
        return new Promise((resolve, reject)=>{
            HistoryModel.find({toDoListID: listDetails.listId})
                .select('-__v -_id')
                .lean()
                .exec((err, historyDetails)=>{
                    if(err){
                        logger.error(err, "toDoController: getALLToDoHistory, findHistory", 6)
                        let apiResponse = response.generate(true, "Failed to Find ToDo List Details", 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(historyDetails)){
                        logger.error("No History Found", "toDoController: getALLToDoHistory, findHistory", 6)
                        let apiResponse = response.generate(true, "No History Found", 404, null)
                        reject(apiResponse)
                    } else {
                        for(let history of historyDetails){
                            let actionId = history.action.split(' ')
                            console.log(actionId[actionId.length -1])
                            console.log(actionId.subStr)
                        }
                       resolve(historyDetails)
                    }
                })
        })
    } // end find history

    findList(req, res)
        .then(findHistory)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "All Todo History", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
} // end get all todo history


module.exports = {

    createToDo: createToDo,
    getAllUserCreatedList: getAllUserCreatedList,
    getSingleToDoList: getSingleToDoList,
    editUserToDoList: editUserToDoList,
    deleteUserToDoList: deleteUserToDoList,
    createListTask: createListTask,
    getAllListTasks: getAllListTasks,
    editListTask: editListTask,
    changeTaskStatus: changeTaskStatus,
    deleteListTask: deleteListTask,
    createSubTask: createSubTask,
    getAllSubTasks: getAllSubTasks,
    editSubTask: editSubTask,
    changeSubTaskStatus: changeSubTaskStatus,
    deleteSubTask: deleteSubTask,
    getALLToDoHistory: getALLToDoHistory

}
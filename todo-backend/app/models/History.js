const mongoose = require('mongoose')
const Schema = mongoose.Schema


let userHistory = new Schema({
    historyId: {type: String, unique: true},
    action: {type: String},
    toDoListID: {type: String, default: ''},
    toDoListName: {type: String, default: ''},
    toDolistVisibility: {type: String, default: ''},
    editedToDoListName: {type: String, default: ''},
    editedToDoVisibility: {type: String, default: ''},
    taskId: {type: String, default: ''},
    taskName: {type: String, default: ''},
    status : {type: String, default: 'open'},
    editTaskName: {type: String, default: ''},
    editStatus: {type: String, default: ''},
    subTaskId:{ type: String, default: ''},
    subTaskName: {type: String, default: ''},
    subTaskStatus :{type: String, default: 'open'},
    editSubTaskName: {type: String, default: ''},
    editSubTaskStatus: {type: String, default: ''},
    createdOn: {type: Date, default: Date.now()},
    modifiedOn: {type: Date, default: Date.now()},
    used :{type: Boolean, default: false}
})

module.exports = mongoose.model('ToDoHistory', userHistory)
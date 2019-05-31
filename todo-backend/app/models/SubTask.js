const mongoose = require('mongoose')
const Schema = mongoose.Schema

let subTask = new Schema({
    subTaskId:{ type: String, default: ''},
    subTaskName: {type: String},
    listId:{ type: String, default: ''},
    taskId:{ type: String},
    subTaskCreatedOn: {type: Date, default: Date.now()},
    subTaskModifiedOn: {type: Date, default: Date.now()},
    status: {type: String, default: 'open'}
})

module.exports = mongoose.model('SubTask', subTask)
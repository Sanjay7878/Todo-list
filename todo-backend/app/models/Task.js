const mongoose = require('mongoose')
const Schema = mongoose.Schema

let newTask = new Schema({
    taskId: {type: String, default: ''},
    taskName: {type: String},
    listId:{type: String},
    taskCreatedOn: {type: Date, default: Date.now()},
    taskModifiedOn: {type: Date, default: Date.now()},
    status: {type: String, default: 'open'},  
})

module.exports = mongoose.model('Task', newTask)
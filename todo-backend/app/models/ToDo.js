const mongoose = require('mongoose')
const Schema = mongoose.Schema

let toDoTask = new Schema(
    {
        listId: {type: String, unique: true},
        listName: {type: String, default: ''},
        createdBy :{type: String, default: ''},
        userId: {type: String, required: true, index: true},
        modifiedOn: {type: Date, default: Date.now()},
        createdOn: {type: Date, default: Date.now()}, 
        visibility: {type: String, default: 'public'}
    }
)

module.exports = mongoose.model('ToDo', toDoTask)
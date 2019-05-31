const mongoose = require('mongoose')
const Schema = mongoose.Schema

let newFriend = new Schema({
    friendId: {type: String, default: ''},
    friendName: {type: String, default:''},
    email: {type: String, default: ''},
    mobileNumber: {type: String, default: ''},
    requestStatus: {type: String, default: ''},
    modifiedOn: {type: Date, default: Date.now()}
})

let userSchema = new Schema(
    {
        firstName: {type: String, default:' '},
        lastName: {type: String, default:' '},
        userId: {type: String, unique: true},
        country: {type: String, default:''},
        countryCode: {type: String, default: ''},
        mobileNumber: {type: Number,default: ' '},
        email: {type: String, unique: true},
        password: {type: String, default: ' '},
        createdOn: {type: Date, default: Date.now()},
        friends: [newFriend]
    }
)

module.exports = mongoose.model('User', userSchema)
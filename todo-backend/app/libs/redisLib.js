const redis = require('redis')
let client = redis.createClient()

const logger = require('./logger')
const check = require('./check')

client.on('connect', ()=>{
    console.log("Redis connection successfully opened")
})

client.on("error", function (err) {
    console.log("Error " + err);
});

let getAllUsersInHash = (hashName, callback) =>{
    client.HGETALL(hashName, (err, result)=>{
        if(err){
            console.log(err)
            logger.error(err.message, " redisLib: getAllUsersInHash ", 5)
            callback(err, null)
        } else if(check.isEmpty(result)){
            console.log("Online User List is Empty")
            callback(null, {})
        } else {
            callback(null, result)
        }
    })
} // end get all users in hash

let setUsersInHash = (hashname , key, value, callback) =>{
    client.HMSET(hashname, [key, value], (err, result)=>{
        if(err){
            console.log(err)
            logger.error(err.message, " redisLib: setHashUsersOnline ", 5)
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
} // end set usersd in hash

let deleteUserFromHash = (hashName, key) =>{
    client.HDEL(hashName, key)
    return true;
} // end delete user from hash

module.exports = {
    getAllUsersInHash : getAllUsersInHash,
    setUsersInHash: setUsersInHash,
    deleteUserFromHash: deleteUserFromHash
}
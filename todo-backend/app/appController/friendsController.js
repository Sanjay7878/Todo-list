const mongoose = require('mongoose')

/*Libraries*/
const check = require('../libs/check')
const response = require('../libs/response')
const logger = require('../libs/logger')


/*Models*/
const UserModel = mongoose.model('User') 


let getAllFriendRequests = (req, res)=>{

    let findUser = ()=>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId: req.query.userId}, (err, userDetails)=>{
                if(err){
                    logger.error(err.message, ' friendsController: getAllFriendRequests, findUser', 5)
                    let apiResponse = response.generate(true, `Failed to Find User`, 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(userDetails)){
                    logger.error('No User Found', ' friendsController: getAllFriendRequests, findUser', 5)
                    let apiResponse = response.generate(true, "No User Details Found", 404, null)
                    reject(apiResponse)
                } else {
                    logger.info('User Found', ' friendsController: getAllFriendRequests, findUser', 5)
                    resolve(userDetails)
                }
            })
        })
    } // end find user


    let findRequests = (userDetails)=>{
        return new Promise((resolve, reject)=>{
            UserModel.find({userId: userDetails.userId})
                .select('friends')
                .lean()
                .exec((err, result)=>{
                    if(err){
                        logger.error(err.message, ' friendsController: getAllFriendRequests, findRequests', 5)
                        let apiResponse = response.generate(true, `Failed to Find Friends`, 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(result)){
                        logger.error('No Friends Found', ' friendsController: getAllFriendRequests, findRequests', 5)
                        let apiResponse = response.generate(true, "No Friends Found", 404, null)
                        reject(apiResponse)
                    } else {
                        for(let friends of result){
                            for(let friendDetails of friends.friends){
                                if(friendDetails.requestStatus === "pending"){
                                    resolve(result)
                                } else {
                                    resolve('No Pending Requests')
                                }
                            }
                        }
                    }
                })
        })  
    } // end find requests


    findUser(req, res)
        .then(findRequests)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'All Friend Requests Found', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
} // end get all friends

let getAllSentRequested = (req, res)=>{

    let findUser = ()=>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId: req.query.userId}, (err, userDetails)=>{
                if(err){
                    logger.error(err.message, ' friendsController: getAllSentRequested, findUser', 5)
                    let apiResponse = response.generate(true, `Failed to Find User`, 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(userDetails)){
                    logger.error('No User Found', ' friendsController: getAllSentRequested, findUser', 5)
                    let apiResponse = response.generate(true, "No User Details Found", 404, null)
                    reject(apiResponse)
                } else {
                    logger.info('User Found', ' friendsController: getAllSentRequested, findUser', 5)
                    resolve(userDetails)
                }
            })
        })
    } // end find user


    let findSentRequests = (userDetails)=>{
        return new Promise((resolve, reject)=>{
            UserModel.find({userId: userDetails.userId})
                .select('friends')
                .lean()
                .exec((err, result)=>{
                    if(err){
                        logger.error(err.message, ' friendsController: getAllSentRequested, findSentRequests', 5)
                        let apiResponse = response.generate(true, `Failed to Find Friends`, 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(result)){
                        logger.error('No Friends Found', ' friendsController: getAllSentRequested, findSentRequests', 5)
                        let apiResponse = response.generate(true, "No Friends Found", 404, null)
                        reject(apiResponse)
                    } else {
                        for(let friends of result){
                            for(let friendDetails of friends.friends){
                                if(friendDetails.requestStatus !== "accepted"){
                                    resolve(result)
                                } else {
                                    resolve('No Requests Sent')
                                }
                            }
                        }
                    }
                })
        })  
    } // end find requests


    findUser(req, res)
        .then(findSentRequests)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'All Sent Requests Found', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
} // end get all sent requests

let getAllFriends = (req, res)=>{

    let findUser = ()=>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId: req.query.userId}, (err, userDetails)=>{
                if(err){
                    logger.error(err.message, ' friendsController: getAllFriends, findUser', 5)
                    let apiResponse = response.generate(true, `Failed to Find user`, 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(userDetails)){
                    logger.error('No User Found', ' friendsController: getAllFriends, findUser', 5)
                    let apiResponse = response.generate(true, "No User Details Found", 404, null)
                    reject(apiResponse)
                } else {
                    logger.info('User Found', ' friendsController: getAllFriends, findUser', 5)
                    resolve(userDetails)
                }
            })
        })
    } // end find user


    let findFriends = (userDetails)=>{
        return new Promise((resolve, reject)=>{
            UserModel.find({userId: userDetails.userId})
                .select('friends')
                .lean()
                .exec((err, result)=>{
                    if(err){
                        logger.error(err.message, ' friendsController: getAllFriends, findFriends', 5)
                        let apiResponse = response.generate(true, `Failed to Find Friends`, 500, null)
                        reject(apiResponse)
                    } else {
                        for(let friends of result){
                            for(let friendDetails of friends.friends){
                                if(friendDetails.requestStatus === "accepted"){
                                    resolve(result)
                                } else {
                                    resolve('No Friends Found')
                                }
                            }
                        }
                    }
                })
        })  
    } // end find requests


    findUser(req, res)
        .then(findFriends)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'All Friends Found', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
} // end get all friends

let getAllNonFriends = (req, res)=>{
    
    let findFriends = ()=>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId: req.query.userId})
                .select('-__v -_id -password')
                .lean()
                .exec((err, userFriends)=>{
                    if(err){
                        logger.error(err.message, ' friendsController: getAllNonFriends, findFriends', 5)
                        let apiResponse = response.generate(true, `Failed to Find Friends`, 500, null)
                        reject(apiResponse)
                    }else {
                        if(userFriends.friends.length === 0){
                            resolve()
                        }else {
                            resolve(userFriends.friends)
                        }  
                        /*
                        for(let friends of result){
                            for(let friendDetails of friends.friends){
                                
                            }
                        }*/
                    }
                })
        })  
    } // end find requests

    let findNonFriendsId = (userFriends)=>{
        return new Promise((resolve, reject)=>{
            let userids = []
            let allUserFriends = []
            UserModel.find()
                .select('-__v -_id')
                .lean()
                .skip(parseInt(req.body.skip) || 0)
                .exec((err, allUsers)=>{
                    if(err){
                        logger.error(err.message, ' friendsController: getAllNonFriends, findNonFriendsId', 5)
                        let apiResponse = response.generate(true, `Failed to Find user`, 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(allUsers)){
                        logger.error('No User Found', ' friendsController: getAllNonFriends, findNonFriendsId', 5)
                        let apiResponse = response.generate(true, "No User Details Found", 404, null)
                        reject(apiResponse)
                    } else {
                        if(check.isEmpty(userFriends)){
                            for(let i=0; i<allUsers.length; i++){
                                userids.push(allUsers[i].userId)
                                
                            }
                            for(let userid of userids){
                                if(userid === req.query.userId){
                                    let currentUserIndex = userids.indexOf(userid)
                                    userids.splice(currentUserIndex, 1)
                                }
                            }
                            resolve(userids)
                        } else{
                            for(let i=0; i<allUsers.length; i++){
                                userids.push(allUsers[i].userId)
                                
                            }

                            for(let j=0; j<userFriends.length; j++){
                                allUserFriends.push(userFriends[j].friendId)
                                allUserFriends.push(req.query.userId)
                            }
                            
                            for( let k=0; k<allUserFriends.length; k++){
                                for(let userid of userids){
                                    if(userid === allUserFriends[k]){
                                        let currentUserIndex = userids.indexOf(userid)
                                        userids.splice(currentUserIndex, 1)
                                    }
                                }
                            }
                            resolve(userids)
                        }
                    }
                })
        })
    } // end find non friends

    let findAllNonFriends = (allNonFriendIds)=>{
        return new Promise((resolve, reject)=>{
            let allNonFriends = []
            for(let i=0; i<allNonFriendIds.length; i++){
                UserModel.findOne({userId: allNonFriendIds[i]})
                .select('-__v -_id -password')
                .exec((err, nonFriends)=>{
                    if(err){
                        logger.error(err.message, ' friendsController: getAllNonFriends, findAllNonFriends', 5)
                        let apiResponse = response.generate(true, `Failed to Find user`, 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(nonFriends)){
                        logger.info('No Other Users Found', ' friendsController: getAllNonFriends, findAllNonFriends', 5)
                        let apiResponse = response.generate(true, "No Other Users Found", 404, null)
                        resolve(apiResponse)
                    } else {
                        allNonFriends.push(nonFriends)
                        
                    }
                    
                }) 
            }
            
            setTimeout(()=>{
                resolve(allNonFriends)
            }, 1000)
            
        })
    } // end find all non friends

    findFriends(req, res)
        .then(findNonFriendsId)
        .then(findAllNonFriends)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "All Users Found", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })

} // end get All non friends

module.exports = {
    getAllFriendRequests: getAllFriendRequests,
    getAllSentRequested: getAllSentRequested,
    getAllFriends: getAllFriends,
    getAllNonFriends:getAllNonFriends
}
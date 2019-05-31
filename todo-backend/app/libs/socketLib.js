const socket = require('socket.io')
const mongoose = require('mongoose')
const events = require('events')
const shortid = require('shortid')
const eventEmitter = new events.EventEmitter()

//impoirting model
const HistoryModel = mongoose.model('ToDoHistory')
const UserModel = mongoose.model('User')
const NotificationModel = mongoose.model('Notification')
const TaskModel = mongoose.model('Task')
const SubTaskModel = mongoose.model('SubTask')
const ToDoModel = mongoose.model('ToDo')

//impoting library files
const tokenLib = require('./tokenLib')
const time = require('./timeLib')
const check = require('./check')
const logger = require('./logger')

let setServer = (server) =>{

    //creating connection
    let io =socket.listen(server)

    let myIo = io.of('')

    // on connection to socket 
    myIo.on('connection', (socket)=>{
        let fullName;
        /**
         * @api {listen} /verify-user Verification the init user
         * @apiVersion 0.0.1
         * @apiGroup Listen 
         *@apiDescription This event <b>("verify-user")</b> has to be listened on the user's end to verify user
        */
        socket.emit('verify-user', '')

        /**
         * @api {emit} /set-user Setting user online
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("set-user")</b> has to be emitted when a user comes online.
         *@apiExample The following data has to be emitted
                        {
                            authToken: String
                        }
        */
        /**
         * @api {listen} /auth-error event
         * @apiVersion 0.0.1
         * @apiGroup Listen 
         *@apiDescription This event <b>("auth-error")</b>  has to be listened to know if any error has occurred on socket.
        */
        socket.on('set-user', (authToken)=>{
            tokenLib.verifyWithoutSecretKey(authToken, (err, user)=>{
                if(err){
                    socket.emit('auth-error', {status: 500, error: 'Please provide correct authToken'})
                } else {
                    console.log("User Verified")
                    let currentUser = user.data;

                    socket.userId = currentUser.userId
                    fullName  = `${currentUser.firstName} ${currentUser.lastName}`
                }
            })
        }) // end socket on set-user

        /**
         * @api {emit} /disconnect diconnecting the socket service
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("disconnect")</b> has to be emitted when a user logout or closes the application.
        */
        socket.on('disconnect', ()=>{
            console.log("User has disconnected")
        }) // end socket on disconnect

        /**
         * @api {emit} /send-friend-request sending request to user
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("send-friend-request")</b> has to be emitted when a user sends friend request to another user.
         *@apiExample The following data has to be emitted
                        {
                            friendName: String,
                            friendId: String,
                            email: String, 
                            mobileNumber: Number
                        }
        */
        /**Events For Friend Requests */
        socket.on('send-friend-request', (data)=>{
            data['currentUser'] = socket.userId 
            data['userName']= fullName
            setTimeout(()=>{
                eventEmitter.emit('send-request', data)
            }, 2000)
        }) // end socket on send friend request

        /**
         * @api {emit} /accept-friend-request Accepting Friend Request
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("accept-friend-request")</b> has to be emitted when a user accepts the friend request
         *@apiExample The following data has to be emitted
                        {
                            userId,
                            friendId
                        }
        */
        socket.on('accept-friend-request', (user)=>{
            user['currentUser'] = socket.userId 
            user['userName']= fullName
            setTimeout(()=>{
                eventEmitter.emit('accept-request', user)
            }, 2000)
        }) // end socket on accept-friend-request

        /**
         * @api {emit} /change-status Change Friend Request Status
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("change-status")</b> has to be emitted when a user wants to change the status
         *@apiExample The following data has to be emitted
                        {   
                            status,
                            userId,
                            friendId
                        }
        */
        socket.on('change-status', (statusData)=>{
            statusData['userName'] = fullName
            setTimeout(()=>{
                eventEmitter.emit('save-status', statusData)
            }, 2000)
        }) // end socket on change-status

        /**
         * @api {emit} /remove-friend Remove Friend from the list
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("remove-friend")</b> has to be emitted when a user wants unfriend or remove a friend from the list
         *@apiExample The following data has to be emitted
                        {   
                            userId,
                            friendId
                        }
        */
        socket.on('remove-friend', (friendDetails)=>{
            friendDetails['userName'] = fullName
            setTimeout(()=>{
                eventEmitter.emit('delete-friend', friendDetails)
            }, 2000)
        }) // end socket on remove-friend

        /**
         * @api {emit} /mark-seen Mark Seen
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("mark-seen")</b> has to be emitted when a user wants to mark the notification as seen
         *@apiExample The following data has to be emitted
                        {   
                            notificationId
                        }
        */
        socket.on('mark-seen', (notification)=>{
            setTimeout(() => {
                eventEmitter.emit('markingSeen', notification)
            }, 2000);
        }) // end socket on mark-seen

        /**End Events For Friend Requests */

        /**Events to undo ToDo Tasks and SubTasks */

        
        // event to Undo create Task

        socket.on('undoEditToDo', (id)=>{
            HistoryModel.findOne({historyId: id}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {

                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                eventEmitter.emit('undo-edited-todo', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        }) // end socket on undoEditToDo  

        /**
         * @api {emit} /undoTask Undo new Task
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("undoTask")</b> has to be emitted when a user wants to undo a creted task in todo list
         *@apiExample The following data has to be emitted
                        {   
                            historyId
                        }
        */
        socket.on('undoTask', (id)=>{
            HistoryModel.findOne({historyId: id}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {

                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                //eventEmitter.emit('delete-created-Task', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        }) // end socket on undoTask 


        /**
         * @api {emit} /undoEditTask Undo Edited Task
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("undoEditTask")</b> has to be emitted when a user wants to undo a task which was edited 
         *@apiExample The following data has to be emitted
                        {   
                            historyId
                        }
        */
        //event to undo edited task
        socket.on('undoEditTask', (editId)=>{
            HistoryModel.findOne({historyId: editId}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {

                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                eventEmitter.emit('undo-edited-Task', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        }) // end socket on undoEditTask 

        /**
         * @api {emit} /undoTaskStatus Undo Task Status
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("undoTaskStatus")</b> has to be emitted when a user wants to undo status of the task which was changed
         *@apiExample The following data has to be emitted
                        {   
                            historyId
                        }
        */
        //event to undo changed status
        socket.on('undoTaskStatus', (statusId)=>{
            HistoryModel.findOne({historyId: statusId}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {

                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                eventEmitter.emit('undo-status-change', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        }) // end socket on undoEditTask

        /**
         * @api {emit} /undoDelete Undo Deleted Task
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("undoDelete")</b> has to be emitted when a user wants to undo a deleted task
         *@apiExample The following data has to be emitted
                        {   
                            historyId
                        }
        */
        //event to undo deleted task
        socket.on('undoDelete', (deleteId)=>{
            HistoryModel.findOne({historyId: deleteId}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log(history)
                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                        options['action'] = 'Task Deleted'
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                        options['action'] = 'Task Created'
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                eventEmitter.emit('undo-deleted-task', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        }) // end socket on undoDelete  


        /**
         * @api {emit} /undoNewSubTask Undo Sub Task
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("undoNewSubTask")</b> has to be emitted when a user wants to undo a Sub Task which was created
         *@apiExample The following data has to be emitted
                        {   
                            historyId
                        }
        */
        socket.on('undoNewSubTask', (subTaskId)=>{
            HistoryModel.findOne({historyId: subTaskId}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {

                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                eventEmitter.emit('undo-created-subtask', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        }) // end socket on undoNewSubTask

        /**
         * @api {emit} /undoEditSubTask Undo Edited Sub Task
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("undoEditSubTask")</b> has to be emitted when a user wants to undo a Sub Task which was Edited
         *@apiExample The following data has to be emitted
                        {   
                            historyId
                        }
        */
        socket.on('undoEditSubTask', (editSubTask)=>{
            HistoryModel.findOne({historyId: editSubTask}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {

                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                eventEmitter.emit('undo-edited-subTask', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        }) // end socket on undoEditSubTask

        /**
         * @api {emit} /undoSubTaskStatus Undo Sub Task Status
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("undoSubTaskStatus")</b> has to be emitted when a user wants to undo the status of a Sub Task which was Changed
         *@apiExample The following data has to be emitted
                        {   
                            historyId
                        }
        */
        socket.on('undoSubTaskStatus', (statusSubTask)=>{
            HistoryModel.findOne({historyId: statusSubTask}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {

                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                eventEmitter.emit('undo-subtask-status', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        })  // end socket on undoSubTaskStatus

        /**
         * @api {emit} /undoSubTaskDelete Undo Deleted Sub Task
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("undoSubTaskDelete")</b> has to be emitted when a user wants to undo a deleted Sub Task
         *@apiExample The following data has to be emitted
                        {   
                            historyId
                        }
        */
        socket.on('undoSubTaskDelete', (deleteSubTask)=>{
            HistoryModel.findOne({historyId: deleteSubTask}, (err, history)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log(history)
                    let options= {};
                    if (history.used === false){
                        options['modifiedOn']= time.now(),
                        options['used']= true
                        options['action'] = 'SubTask Deleted'
                    } else{
                        options['modifiedOn']= time.now(),
                        options['used']= false
                        options['action'] = 'SubTask Created'
                    }
                    HistoryModel.findOneAndUpdate({historyId: history.historyId}, options, (err, updateHistory)=>{
                        if(err){
                            console.log(err)
                        } else {
                            setTimeout(()=>{
                                eventEmitter.emit('undo-deleted-subtask', updateHistory)
                            }, 2000)
                        }
                    })
                    
                }
            })
        }) // end socket on undoSubTaskDelete

    }) //end socket connection

    eventEmitter.on('send-request', (data)=>{
        
        UserModel.findOne({'friends.friendId': data.friendId}, (err, result)=>{
            if(err){
                logger.error(err, 'socketLib: evenetEmitter - send-request', 6)
            }else if(check.isEmpty(result)){
                let newFriendRequest = {
                    friendId: data.friendId,
                    friendName: data.friendName,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    requestStatus: 'pending',
                    modifiedOn: time.now()
                }

                let options = {
                    $push: {
                        friends:{
                            $each: [newFriendRequest],
                            $sort: {modifiedOn: -1}
                        }
                    }
                }
                UserModel.findOneAndUpdate({userId: data.currentUser}, options, (err, userDetails)=>{
                    if(err){
                        console.log(err)
                    } else {
                        let friend = {
                            user: data.friendId,
                            friend: userDetails
                        }
                        console.log('Friend Request Send')
                        let notify = new NotificationModel({
                            notificationId: shortid.generate(),
                            senderName: data.userName,
                            senderId: data.currentUser,
                            receiverId: data.friendId,
                            receiverName: data.friendName,
                            message: `You Have Received A New Friend Request`,
                            notifiedOn: time.now()
                        })
                       eventEmitter.emit('recieve-request', friend)

                        setTimeout(()=>{
                            notify.save((err, newNotification)=>{
                                if(err){
                                    console.log(err)
                                } else {
                                    console.log("New notification Saved")
                                }
                            })
                        }, 1000)
                    }
                })
            }else {
                logger.error("User is already a friend", "socketLib: evenetEmitter - send-request", 6)
            }
        })
        
    }) // end eventemitter on send-request

    eventEmitter.on('recieve-request', (user)=>{
        let receievedRequest = {
            friendId: user.friend.userId,
            friendName: user.friend.firstName+' '+user.friend.lastName,
            email: user.friend.email,
            mobileNumber: user.friend.mobileNumber,
            requestStatus: 'pending',
            modifiedOn: time.now()
        }
        
        let options = {
            $push: {
                friends: {
                    $each: [receievedRequest],
                    $sort: {modifiedOn: -1}
                }
            }
        }

        UserModel.updateOne({userId: user.user}, options, {multi: true}, (err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log("Friend Request Received")
            }
        })
    }) // end eventemitter on recieve-request

    eventEmitter.on('accept-request', (user)=>{
        UserModel.findOne({userId: user.currentUser}, (err, userDetails)=>{
            if(err){
                logger.error(err, "socketLib: evenetEmitter - accepted-request")
            } else {
                
                let newFriend ={
                    friendId: user.currentUser,
                    friendName: userDetails.firstName+' '+userDetails.lastName,
                    email: userDetails.email,
                    mobileNumber: userDetails.mobileNumber,
                    requestStatus: 'accepted',
                    modifiedOn: time.now()
                }
                let options = {
                    $set:{
                        friends :[newFriend]
                    }
                }
                
                UserModel.findOneAndUpdate({userId: user.friendId},options, (err, result)=>{
                    if(err){
                        console.log(err)
                    } else {

                        let userData = {
                            user: user.currentUser,
                            friendDetails: result
                        }
                        console.log('Friend Request Accepted')
                        let notify = new NotificationModel({
                            notificationId: shortid.generate(),
                            senderId:  user.currentUser,
                            senderName: user.userName,
                            receiverId: user.friendId,
                            receiverName: result.firstName+' '+result.lastName,
                            message: `Friend Request Has Been Accepted`,
                            modifiedOn: time.now()
                        })
                        setTimeout(()=>{
                            eventEmitter.emit('accepted-request', userData)
                        }, 2000)

                        setTimeout(()=>{
                            notify.save((err, result)=>{
                                if(err){
                                    console.log(err)
                                } else {
                                    console.log("Notifications Sent")
                                }
                            })
                        }, 3000)
                    }
                })
            }
        })
    }) // end eventEmiiter on accept-request
   
    eventEmitter.on('accepted-request', (data)=>{
        let receievedRequest = {
            friendId: data.friendDetails.userId,
            friendName: data.friendDetails.firstName+' '+data.friendDetails.lastName,
            email: data.friendDetails.email,
            mobileNumber: data.friendDetails.mobileNumber,
            requestStatus: 'accepted',
            modifiedOn: time.now()
        }
        let options = {
            $set: {
                friends: [receievedRequest]
            }
        }

        UserModel.updateOne({userId: data.user}, options, {multi: true}, (err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log("Friend Added")
            }
        })
    }) // end eventEmiiter on accepted-request

    eventEmitter.on('save-status', (statusData)=>{
        UserModel.findOne({userId: statusData.user}, (err, userDetails)=>{
            if(err){
                console.log(err)
            } else {
                let friendStatus = {
                    friendId: statusData.user,
                    friendName: userDetails.firstName+' '+userDetails.lastName,
                    email: userDetails.email,
                    mobileNumber: userDetails.mobileNumber,
                    requestStatus: statusData.status,
                    modifiedOn: time.now()
                }
                
                let options = {
                    $set:{
                        friends :[friendStatus]
                    }
                }
                console.log(statusData.friend)
                UserModel.findOneAndUpdate({userId: statusData.friend}, options, {multi: true}, (err, result)=>{
                    if(err){
                        console.log(err)
                    } else {
                        console.log('Friend Request Status Changed')
                        let statusDetails ={
                            status: statusData.status,
                            user: statusData.user,
                            friend: result
                        }
                        
                        let notify = new NotificationModel({
                            notificationId: shortid.generate(),
                            senderId: statusData.user,
                            senderName: statusData.userName,
                            receiverId: statusData.friend,
                            receiverName: result.firstName+' '+result.lastName,
                            message: `Friend Request Status Has Been Changed To ${statusData.status}`,
                            modifiedOn: time.now()
                        })

                        setTimeout(()=>{
                            eventEmitter.emit('changed-status', statusDetails)
                        }, 3000)

                        setTimeout(()=>{
                            notify.save((err, result)=>{
                                if(err){
                                    console.log(err)
                                } else {
                                    console.log("Notifications Sent")
                                }
                            })
                        }, 4000)
                    }
                })
            }
        })
    }) // end eventEmiiter on save-status

    eventEmitter.on('changed-status', (statusDetails)=>{
        let friendStatus = {
            friendId: statusDetails.friend.userId,
            friendName: statusDetails.friend.firstName+' '+statusDetails.friend.lastName,
            email: statusDetails.friend.email,
            mobileNumber: statusDetails.friend.mobileNumber,
            requestStatus: statusDetails.status,
            modifiedOn: time.now()
        }

        let options = {
            $set: {
                friends: [friendStatus]
            }
        }

        UserModel.updateOne({userId: statusDetails.user}, options, {multi: true}, (err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log('Request Status has been Changed')
            }
        })
    }) //end eventEmiiter on changed-status

    eventEmitter.on('delete-friend', (friendDetails)=>{
        UserModel.findOne({userId: friendDetails.friend.friendId}, (err, userDetails)=>{
            if(err){
                console.log(err)
            } else {
                let options = {
                    $pull:{
                        friends: {
                            friendsId: friendDetails.friend.friendId
                        }
                    }
                }
                console.log(friendDetails)
                UserModel.findOneAndUpdate({userId: friendDetails.user}, options, (err, result)=>{
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Friend Has Been Removed")

                        let notify = new NotificationModel({
                            notificationId: shortid.generate(),
                            senderId: friendDetails.user,
                            senderName: friendDetails.userName,
                            receiverId: friendDetails.friend.friendId,
                            receiverName: friendDetails.friend.friendName,
                            message: `User Has Removed You As Friends`,
                            modifiedOn: time.now()
                        })
                        let removeDetails = {
                            user: friendDetails.user,
                            friend: friendDetails.friend.friendId,
                        }
                        setTimeout(()=>{
                            eventEmitter.emit('deleted-friend', removeDetails)
                        }, 3000)

                        setTimeout(()=>{

                            notify.save((err, result)=>{
                                if(err){
                                    console.log(err)
                                } else {
                                    console.log("Notifications Sent")
                                }
                            })
                        }, 4000)
                    }
                })
            }
        })
    }) //end eventEmiiter on delete-friend

    eventEmitter.on('deleted-friend', (userDetails)=>{
        let options = {
            $pull:{
                friends: {
                    friendId: userDetails.user
                }
            }
        }
        UserModel.updateOne({userId: userDetails.friend}, options, (err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log("Friend Removed Successfully")
            }
        })
    }) //end eventEmiiter on deleted-friend

    eventEmitter.on('markingSeen', (notification)=>{
        let options = {
            seen: true
        }

        NotificationModel.updateOne({notificationId: notification}, options, (err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log('Notification Seen')
            }
        })
    }) //end eventEmiiter on markingSeen

    /**EventEmitters for undo ToDo Tasks and SubTasks sockets*/

    eventEmitter.on('undo-edited-todo', (history)=>{
        let options ={}
        if(history.used === false){
            options['listName']= history.toDoListName,
            options['modifiedOn']= time.now()
            options['visibility']= history.toDolistVisibility
        }else {
            options['listName']= history.editedToDoListName,
            options['modifiedOn']= time.now(),
            options['visibility']= history.editedToDoVisibility
        }

        ToDoModel.updateOne({listId: history.toDoListID}, options, {multi: true},(err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log("UnDo Edited ToDo Succesfull")
            }
        })
    }) //end eventEmiiter on undo-edited-todo
    
    eventEmitter.on('delete-created-Task', (history)=>{
        if(history.used === true){
            TaskModel.deleteOne({taskId: history.taskId}, (err, taskDetails)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log("Task Deleted")
                }
            })
        }else {
            HistoryModel.findOne({historyId: history.historyId}, (err, historyDetails)=>{
                if(err){
                    console.log(err)
                } else {
                   
                    let task = new TaskModel({
                        taskId: historyDetails.taskId,
                        taskName: historyDetails.taskName,
                        listId: historyDetails.toDoListID,
                        taskCreatedOn: time.now(),
                        taskModifiedOn: time.now(),
                        status: historyDetails.status
                    })

                    task.save((err, result)=>{
                        if(err){
                            console.log(err)
                        } else{
                            console.log('Task Created')
                        }
                    })
                }
            })
        }
    }) //end eventEmiiter on delete-created-Task

    eventEmitter.on('undo-edited-Task', (history)=>{
        let options ={}
        if(history.used === false){
            options['taskName']= history.editTaskName,
            options['taskModifiedOn']= time.now()
        }else {
            options['taskName']= history.taskName,
            options['taskModifiedOn']= time.now()
        }

        TaskModel.updateOne({taskId: history.taskId}, options, {multi: true},(err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log("UnDo Edit Task Succesfull")
            }
        })
    }) //end eventEmiiter on undo-edited-Task

    eventEmitter.on('undo-status-change', (history)=>{ 
        
        let options = {}
        if(history.editStatus == "done" && history.used === true){
                options.status= 'open',
                options.taskModifiedOn= time.now()
        } else {
            options.status= 'done',
            options.taskModifiedOn= time.now() 
        }

        TaskModel.updateOne({taskId: history.taskId}, options, (err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log("Undo Status Succesfull")
            }
        })
        
    }) //end eventEmiiter on undo-status-change
    
    eventEmitter.on('undo-deleted-task', (history)=>{
        if(history.used === true){
            let task = new TaskModel({
                taskId: history.taskId,
                taskName: history.taskName,
                listId: history.toDoListID,
                taskCreatedOn: time.now(),
                taskModifiedOn: time.now(),
                status: history.status
            })
    
            task.save((err, result)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log("Undo Deleted Task Successful")
                }
            })
        } else {
            TaskModel.deleteOne({taskId: history.taskId}, (err, result)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log('Task Deleted')
                }
            })
        }
        
    }) //end eventEmiiter on undo-deleted-task

    eventEmitter.on('undo-created-subtask', (history)=>{
        if(history.used === true){
            SubTaskModel.deleteOne({subTaskId: history.subTaskId}, (err, taskDetails)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log("Sub Task Deleted")
                }
            })
        }else {
            HistoryModel.findOne({historyId: history.historyId}, (err, historyDetails)=>{
                if(err){
                    console.log(err)
                } else {
                   
                    let subTask = new SubTaskModel({
                        taskId: historyDetails.taskId,
                        taskName: historyDetails.taskName,
                        listId: historyDetails.toDoListID,
                        taskCreatedOn: time.now(),
                        taskModifiedOn: time.now(),
                        status: historyDetails.status
                    })

                    subTask.save((err, result)=>{
                        if(err){
                            console.log(err)
                        } else{
                            console.log('SubTask Created')
                        }
                    })
                }
            })
        }
        
    }) //end eventEmiiter on undo-created-subtask

    eventEmitter.on('undo-edited-subTask', (history)=>{
        let options ={}
        if(history.used === false){
            options['taskName']= history.editSubTaskName,
            options['taskModifiedOn']= time.now()
        }else {
            options['taskName']= history.subTaskName,
            options['taskModifiedOn']= time.now()
        }

        SubTaskModel.updateOne({subTaskId: history.subTaskId}, options, {multi: true},(err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log("UnDo Edit Task Succesfull")
            }
        })

    }) //end eventEmiiter on undo-edited-subTask

    eventEmitter.on('undo-subtask-status', (history)=>{
        let options = {}
        if(history.editSubTaskStatus === "done" && history.used === true){
            options.status= 'open',
            options.subTaskModifiedOn= time.now()    
        } else {
            options.status= 'done',
            options.subTaskModifiedOn= time.now()  
        }
        SubTaskModel.updateOne({subTaskId: history.subTaskId}, options, {multi: true}, (err, result)=>{
            if(err){
                console.log(err)
            } else {
                console.log("Undo SubTask Status Succesfull")
            }
        })
    }) //end eventEmiiter on undo-subtask-status

    eventEmitter.on('undo-deleted-subtask', (history)=>{
        if(history.used === true){
            let subTask = new SubTaskModel({
                subTaskId: history.subTaskId,
                subTaskName: history.subTaskName,
                listId: history.toDoListID,
                taskId: history.taskId,
                subTaskCreatedOn: time.now(),
                subTaskModifiedOn: time.now(),
                status: history.status
            })
    
            subTask.save((err, result)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log("Undo Deleted SubTask Successful")
                }
            })

        } else {
            SubTaskModel.deleteOne({subTaskId: history.subTaskId}, (err, result)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log('Task Deleted')
                }
            })
        }
        
        
    }) //end eventEmiiter on undo-deleted-subtask

} // end set server

module.exports = {
    setServer: setServer
}
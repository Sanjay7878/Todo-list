define({ "api": [
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/friends/get/all-friends",
    "title": "Get All Friends Of A User",
    "version": "0.0.1",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Friends Found\",\n\"status\": 200,\n\"data\": {\n                    \"_id\": \"string\",\n                    \"friends\": [\n                        {\n                            \"friendId\": \"string\",\n                            \"friendName\": \"string\",\n                            \"email\": \"string\",\n                            \"mobileNumber\": \"number\",\n                            \"requestStatus\": \"string\",\n                            \"modifiedOn\": \"date\",\n                            \"_id\": \"string\"\n                        }\n                    ]\n                }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": false,\n\"message\": \"No Friends Found,\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetHttpTodoSanjayinfotechyComApiV1FriendsGetAllFriends"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/friends/get/friend-requests",
    "title": "Get All Particular User Friend Requests",
    "version": "0.0.1",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Friend Requests Found'\",\n\"status\": 200,\n\"data\": {\n                    \"_id\": \"string\",\n                    \"friends\": [\n                        {\n                            \"friendId\": \"string\",\n                            \"friendName\": \"string\",\n                            \"email\": \"string\",\n                            \"mobileNumber\": \"number\",\n                            \"requestStatus\": \"string\",\n                            \"modifiedOn\": \"date\",\n                            \"_id\": \"string\"\n                        }\n                    ]\n                }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Friends Found,\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetHttpTodoSanjayinfotechyComApiV1FriendsGetFriendRequests"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/friends/get/non-friends",
    "title": "Get All Users Who are Not Friends",
    "version": "0.0.1",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Users Found\",\n\"status\": 200,\n\"data\": [\n                    {\n                        \"firstName\": \"string\",\n                        \"lastName\": \"string\",\n                        \"country\": \"string\",\n                        \"countryCode\": \"string\",\n                        \"mobileNumber\": number,\n                        \"createdOn\": \"date\",\n                        \"userId\": \"string\",\n                        \"email\": \"string\",\n                        \"friends\": []\n                    },\n                    .........\n                ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": false,\n\"message\": \"No Friends Found,\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetHttpTodoSanjayinfotechyComApiV1FriendsGetNonFriends"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/friends/get/received/notifications",
    "title": "Get All Users received Notifications",
    "version": "0.0.1",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All User Received Notifications Found\",\n\"status\": 200,\n\"data\": [\n                    {\n                        \"senderId\": \"string\",\n                        \"receiverId\": \"string\",\n                        \"message\": \"string\",\n                        \"seen\": boolean,\n                        \"_id\": \"string\",\n                        \"notificationId\": \"string\",\n                        \"notifiedOn\": \"date\",\n                        \"__v\": 0\n                    },\n                    .........\n                ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": false,\n\"message\": \"No User Notifications Found,\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetHttpTodoSanjayinfotechyComApiV1FriendsGetReceivedNotifications"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/friends/get/sent/notifications",
    "title": "Get All Users Sent Notifications",
    "version": "0.0.1",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All User Sent Notifications Found\",\n\"status\": 200,\n\"data\": [\n                    {\n                        \"senderId\": \"string\",\n                        \"receiverId\": \"string\",\n                        \"message\": \"string\",\n                        \"seen\": boolean,\n                        \"_id\": \"string\",\n                        \"notificationId\": \"string\",\n                        \"notifiedOn\": \"date\",\n                        \"__v\": 0\n                    },\n                    .........\n                ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": false,\n\"message\": \"No User Notifications Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetHttpTodoSanjayinfotechyComApiV1FriendsGetSentNotifications"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/friends/get/sent-requests",
    "title": "Get All Particular User Sent Requests",
    "version": "0.0.1",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Sent Requests Found\",\n\"status\": 200,\n\"data\": {\n                    \"_id\": \"string\",\n                    \"friends\": [\n                        {\n                            \"friendId\": \"string\",\n                            \"friendName\": \"string\",\n                            \"email\": \"string\",\n                            \"mobileNumber\": \"number\",\n                            \"requestStatus\": \"string\",\n                            \"modifiedOn\": \"date\",\n                            \"_id\": \"string\"\n                        }\n                    ]\n                }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Friends Found,\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "GetHttpTodoSanjayinfotechyComApiV1FriendsGetSentRequests"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/friends/delete/notification",
    "title": "Delete A particular Notifications",
    "version": "0.0.1",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notificationId",
            "description": "<p>notificationId of the notification. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Notification Found\",\n\"status\": 200,\n\"data\": { \n          \"n\": 1,\n                    \"ok\": 1,\n                    \"deletedCount\": 1\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": false,\n\"message\": \"No Notification Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/friends.js",
    "groupTitle": "Friends",
    "name": "PostHttpTodoSanjayinfotechyComApiV1FriendsDeleteNotification"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/all/todo/tasks",
    "title": "Get All Task Of A ToDo List",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "skip",
            "description": "<p>skip count. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the toDo list. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Tasks Found\",\n\"status\": 200,\n\"data\": {\n                \"listName\": \"string\",\n                \"createdBy\": \"string\",\n                \"modifiedOn\": \"date\",\n                \"createdOn\": \"date\",\n                \"visibility\": \"string\",\n                \"listId\": \"string\",\n                \"userId\": \"string\"\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No ToDo Lists Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "GetHttpTodoSanjayinfotechyComApiV1TodoAllTodoTasks"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/get-all/user/todolist",
    "title": "Get All User ToDo Lists",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All User ToDo List Found\",\n\"status\": 200,\n\"data\": {\n                \"listName\": \"string\",\n                \"createdBy\": \"string\",\n                \"modifiedOn\": \"date\",\n                \"createdOn\": \"date\",\n                \"visibility\": \"string\",\n                \"listId\": \"string\",\n                \"userId\": \"string\"\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No ToDo Lists Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "GetHttpTodoSanjayinfotechyComApiV1TodoGetAllUserTodolist"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/get/sub/tasks",
    "title": "Get All Sub-Tasks Of A Particaular Task",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the toDo task. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "skip",
            "description": "<p>skip count. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Sub Tasks Found\",\n\"status\": 200,\n\"data\": {\n                \"subTaskId\": \"string\",\n                \"listId\": \"string\",\n                \"subTaskCreatedOn\": \"date\",\n                \"subTaskModifiedOn\": \"date\",\n                \"status\": \"string\",\n                \"taskId\": \"string\",\n                \"subTaskName\": \"string\"\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Sub Tasks Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "GetHttpTodoSanjayinfotechyComApiV1TodoGetSubTasks"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/get/todo",
    "title": "Get Single ToDo List",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "skip",
            "description": "<p>skip count. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the ToDo List. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"ToDo List Found\",\n\"status\": 200,\n\"data\": {\n                \"listName\": \"string\",\n                \"createdBy\": \"string\",\n                \"modifiedOn\": \"date\",\n                \"createdOn\": \"date\",\n                \"visibility\": \"string\",\n                \"listId\": \"string\",\n                \"userId\": \"string\"\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No ToDo List Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "GetHttpTodoSanjayinfotechyComApiV1TodoGetTodo"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/get/todo/history",
    "title": "Get All History Of A Particular ToDo List",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the ToDo List. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Todo History\",\n\"status\": 200,\n\"data\": {\n                \"toDoListID\": \"string\",\n                \"toDoListName\": \"string\",\n                \"toDolistVisibility\": \"string\",\n                \"editedToDoListName\": \"string\",\n                \"editedToDoVisibility\": \"string\",\n                \"taskId\": \"string\",\n                \"taskName\": \"string\",\n                \"status\": \"string\",\n                \"editTaskName\": \"string\",\n                \"editStatus\": \"string\",\n                \"subTaskId\": \"string\",\n                \"subTaskName\": \"string\",\n                \"subTaskStatus\": \"string\",\n                \"editSubTaskName\": \"string\",\n                \"editSubTaskStatus\": \"string\",\n                \"createdOn\": \"date\",\n                \"modifiedOn\": \"date\",\n                \"used\": boolean,\n                \"historyId\": \"string\",\n                \"action\": \"string\"\n            },\n            ............\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No History Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "GetHttpTodoSanjayinfotechyComApiV1TodoGetTodoHistory"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/create",
    "title": "Create New ToDo List",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>list name of the ToDo List. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "visibility",
            "description": "<p>visibility of the List (Public or Private) (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"ToDo-List Created Succesfully\",\n\"status\": 200,\n\"data\": {\n                \"listName\": \"string\",\n                \"createdBy\": \"string\",\n                \"modifiedOn\": \"date\",\n                \"createdOn\": \"date\",\n                \"visibility\": \"string\",\n                \"_id\": \"string\",\n                \"listId\": \"string\",\n                \"userId\": \"string\",\n                \"__v\": 0\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to Save To Do List\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PostHttpTodoSanjayinfotechyComApiV1TodoCreate"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/create/sub/task",
    "title": "Create New Sub-Task For A Task",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the toDo task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTaskName",
            "description": "<p>sub-task name for the sub-task. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"SubTask Created Succesfully\",\n\"status\": 200,\n\"data\": {\n                \"subTaskId\": \"string\",\n                \"listId\": \"string\",\n                \"subTaskCreatedOn\": \"date\",\n                \"subTaskModifiedOn\": \"date\",\n                \"status\": \"string\",\n                \"_id\": \"string\",\n                \"taskId\": \"string\",\n                \"subTaskName\": \"string\",\n                \"__v\": 0\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to Save Sub Task Details\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PostHttpTodoSanjayinfotechyComApiV1TodoCreateSubTask"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/create/task",
    "title": "Create New Task For A ToDo List",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the toDo list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskName",
            "description": "<p>task name of the task. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"ToDo-Task Created Succesfully\",\n\"status\": 200,\n\"data\": {\n                \"taskId\": \"string\",\n                \"taskCreatedOn\": \"date\",\n                \"taskModifiedOn\": \"date\",\n                \"status\": \"string\",\n                \"_id\": \"string\",\n                \"listId\": \"string\",\n                \"taskName\": \"string\",\n                \"__v\": 0\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed To Save Task Details\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PostHttpTodoSanjayinfotechyComApiV1TodoCreateTask"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/delete/sub/task",
    "title": "Delete A Particular Sub-Task",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>TaskId of that Task (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTaskId",
            "description": "<p>subTaskId of the Sub-Task. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Sub Task Deleted Successfully\",\n\"status\": 200,\n\"data\": { \n      \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Sub Task Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PostHttpTodoSanjayinfotechyComApiV1TodoDeleteSubTask"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/delete/task",
    "title": "Delete A Particular ToDo Task",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the ToDo List  (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the ToDo Task. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Task Deleted Successfully,\n\"status\": 200,\n\"data\": { \n      \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Task Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PostHttpTodoSanjayinfotechyComApiV1TodoDeleteTask"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/delete/todolist",
    "title": "Delete Particular User ToDo Lists",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the ToDo List. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"ToDo List Deleted Successfully\",\n\"status\": 200,\n\"data\": { \n      \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No ToDo List Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PostHttpTodoSanjayinfotechyComApiV1TodoDeleteTodolist"
  },
  {
    "type": "put",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/change/subtask/status",
    "title": "Change Status Of A Particular Sub-Task",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of that Task (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTaskId",
            "description": "<p>subTaskId of the Sub-Task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status name of the Sub-Task (open or done) (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Sub Task Status Updated\",\n\"status\": 200,\n\"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Sub Task Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PutHttpTodoSanjayinfotechyComApiV1TodoChangeSubtaskStatus"
  },
  {
    "type": "put",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/change/task/status",
    "title": "Change Status OF A Particular ToDo Task",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the ToDo Task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the ToDo Task (open or done) (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Task Status Updated\",\n\"status\": 200,\n\"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Task Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PutHttpTodoSanjayinfotechyComApiV1TodoChangeTaskStatus"
  },
  {
    "type": "put",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/edit/sub/task",
    "title": "Edit A Particular Sub-Task",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of that Task (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTaskId",
            "description": "<p>subTaskId of the Sub-Task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTaskName",
            "description": "<p>sub-task name of the Sub-Task (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Sub Task Updated Successfully\",\n\"status\": 200,\n\"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Sub Task Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PutHttpTodoSanjayinfotechyComApiV1TodoEditSubTask"
  },
  {
    "type": "put",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/edit/task",
    "title": "Edit Particular ToDo Task",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the ToDo List. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the ToDo Task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskName",
            "description": "<p>taskName of the ToDo Task (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Task Updated Successfully\",\n\"status\": 200,\n\"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Task Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PutHttpTodoSanjayinfotechyComApiV1TodoEditTask"
  },
  {
    "type": "put",
    "url": "http://todo.sanjayinfotechy.com/api/v1/toDo/edit/todolist",
    "title": "Edit Particular User ToDo Lists",
    "version": "0.0.1",
    "group": "ToDo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the ToDo List. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>list name of the ToDo List. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "visibility",
            "description": "<p>visibility of the List (Public or Private) (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"ToDo List Updated Successfully\",\n\"status\": 200,\n\"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No ToDo List Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/toDo.js",
    "groupTitle": "ToDo",
    "name": "PutHttpTodoSanjayinfotechyComApiV1TodoEditTodolist"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/get/all",
    "title": "Get All Users",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All User Details Found\",\n\"status\": 200,\n\"data\": {\n                  \"firstName\": \"string\",\n                  \"lastName\": \"string\",\n                  \"country\": \"string\",\n                  \"countryCode\": \"string\",\n                  \"mobileNumber\": number,\n                  \"createdOn\": \"date\"\n                  \"userId\": \"string\",\n                  \"email\": \"string\",\n                  \"friends\": []\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Users Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "GetHttpTodoSanjayinfotechyComApiV1UserGetAll"
  },
  {
    "type": "get",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/get/user",
    "title": "Get Single User Info",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose info is needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Found\",\n\"status\": 200,\n\"data\": {\n                  \"firstName\": \"string\",\n                  \"lastName\": \"string\",\n                  \"country\": \"string\",\n                  \"countryCode\": \"string\",\n                  \"mobileNumber\": number,\n                  \"createdOn\": \"date\"\n                  \"userId\": \"string\",\n                  \"email\": \"string\",\n                  \"friends\": []\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No User Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "GetHttpTodoSanjayinfotechyComApiV1UserGetUser"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/change/password",
    "title": "Api for change the existing password",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>new password of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Password changed\",\n\"status\": 200,\n\"data\": {\n               \"n\": 1,\n               \"nModified\": 1,\n               \"ok\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to Change The Password\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTodoSanjayinfotechyComApiV1UserChangePassword"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/delete/user",
    "title": "Api to delete user details",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose info is needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Deleted the user successfully\",\n\"status\": 200,\n\"data\": { \n      \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No user Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTodoSanjayinfotechyComApiV1UserDeleteUser"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/forgot-password",
    "title": "Api to send password reset link",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email address of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Details Found\",\n\"status\": 200,\n\"data\": \"Mail Has Been Sent\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No user Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTodoSanjayinfotechyComApiV1UserForgotPassword"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/login",
    "title": "Api for user login",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Login Successful\",\n\"status\": 200,\n\"data\": {\n          \"authToken\": \"string\",\n                    \"userDetails\": {\n                                    \"firstName\": \"string\",\n                                    \"lastName\": \"string\",\n                                    \"country\": \"string\",\n                                    \"countryCode\": \"string\",\n                                    \"mobileNumber\": number,\n                                    \"userId\": \"string\",\n                                    \"email\": \"string\",\n                                    \"friends\": []\n                              }\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No user Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTodoSanjayinfotechyComApiV1UserLogin"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/logout",
    "title": "Api for Logout",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n            \"message\": \"Logged out successfully\",\n            \"status\": 200,\n            \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Already Logged out or Invalid UserId\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTodoSanjayinfotechyComApiV1UserLogout"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/singup",
    "title": "Api for user to singup",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>last name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>country of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>countryCode of the user's country.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Created Succesfully\",\n\"status\": 200,\n\"data\": {\n               \"firstName\": \"string\",\n               \"lastName\": \"string\",\n               \"country\": \"string\",\n               \"countryCode\": \"string\",\n               \"mobileNumber\": number,\n               \"createdOn\": \"date\",\n               \"_id\": \"string\",\n               \"userId\": \"string\",\n               \"email\": \"string\",\n               \"friends\": [],\n               \"__v\": 0\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to Create User\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTodoSanjayinfotechyComApiV1UserSingup"
  },
  {
    "type": "post",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/:userId/reset-password",
    "title": "Api for forgot-password",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>new password of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Password Reset Successful\",\n\"status\": 200,\n\"data\": {\n               \"n\": 1,\n               \"nModified\": 1,\n               \"ok\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed To Reset The Password\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTodoSanjayinfotechyComApiV1UserUseridResetPassword"
  },
  {
    "type": "put",
    "url": "http://todo.sanjayinfotechy.com/api/v1/user/edit/userId",
    "title": "Api to edit user details",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose info is needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Details Edited successfully\",\n\"status\": 200,\n\"data\": {\n          \"n\": 1,\n                    \"nModified\": 1,\n                    \"ok\": 1\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No user Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PutHttpTodoSanjayinfotechyComApiV1UserEditUserid"
  }
] });

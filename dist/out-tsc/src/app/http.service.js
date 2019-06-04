import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
var HttpService = /** @class */ (function () {
    function HttpService(http) {
        this.http = http;
        this.baseurl = "http://todo.sanjayinfotechy.com/api/v1";
        this.setUserInfoToLocalStorage = function (data) {
            localStorage.setItem('userInfo', JSON.stringify(data));
        }; // end set user info to local storage
        this.getUserInfoFromLocalStorage = function () {
            return JSON.parse(localStorage.getItem('userInfo'));
        }; // end get user infor from Local storage
        this.deleteUserInfoFromLocalStorage = function () {
            localStorage.removeItem('userInfo');
        }; // end delete user info from local storage
    }
    HttpService.prototype.signupFunction = function (data) {
        var params = new HttpParams()
            .set('firstName', data.firstName)
            .set('lastName', data.lastName)
            .set('country', data.country)
            .set('countryCode', data.countryCode)
            .set('mobileNumber', data.mobileNumber)
            .set('email', data.email)
            .set('password', data.password);
        return this.http.post(this.baseurl + "/user/signup", params);
    }; // end user signup
    HttpService.prototype.loginFunction = function (data) {
        var params = new HttpParams()
            .set('email', data.email)
            .set('password', data.password);
        return this.http.post(this.baseurl + "/user/login", params);
    }; // end login function
    HttpService.prototype.forgotPasswordLink = function (email) {
        var params = new HttpParams()
            .set('email', email);
        return this.http.post(this.baseurl + "/user/forgot-password", params);
    }; // end forgot password link
    HttpService.prototype.resetForgotPassword = function (data) {
        var params = new HttpParams()
            .set('password', data.password);
        return this.http.post(this.baseurl + "/user/" + data.userId + "/reset-password", params);
    }; // end reset forgot password
    HttpService.prototype.logoutFunction = function (userId) {
        return this.http.post(this.baseurl + "/user/logout", userId);
    }; // end logout function
    HttpService.prototype.getAllContries = function () {
        return this.http.get("../assets/json/countries.json");
    }; // end get all countries
    HttpService.prototype.getAllContryCodes = function () {
        return this.http.get("../assets/json/countryCodes.json");
    }; // end get All Country codes
    HttpService.prototype.getSingleUser = function (data) {
        return this.http.get(this.baseurl + "/user/get/user?authToken=" + data.authToken + "&userId=" + data.userId, data.userId);
    }; // end get single user
    HttpService.prototype.editUserDetails = function (data) {
        var params = new HttpParams()
            .set('authToken', data.authToken)
            .set('userId', data.userId)
            .set('firstName', data.firstName)
            .set('lastName', data.lastName)
            .set('country', data.country)
            .set('countryCode', data.countryCode)
            .set('mobileNumber', data.mobileNumber)
            .set('email', data.email);
        return this.http.put(this.baseurl + "/user/edit/userId", params);
    }; // end edit user details
    HttpService.prototype.changePassword = function (data) {
        var params = new HttpParams()
            .set('userId', data.userId)
            .set('authToken', data.authToken)
            .set('password', data.password);
        return this.http.post(this.baseurl + "/user/change/password", params);
    }; // end change password
    HttpService.prototype.getAllUsers = function (authToken) {
        return this.http.get(this.baseurl + "/user/get/all?authToken=" + authToken);
    }; // end get all user
    /**
     *
     * Http Requests for todo
     *
     */
    HttpService.prototype.createToDoList = function (data) {
        var params = new HttpParams()
            .set('userId', data.userId)
            .set('listName', data.listName)
            .set('visibility', data.visibility);
        return this.http.post(this.baseurl + "/toDo/create", params);
    }; // end create todo list
    HttpService.prototype.getAllToDoList = function (userId) {
        return this.http.get(this.baseurl + "/toDo/get-all/user/todolist?userId=" + userId);
    }; // end get all to do list
    HttpService.prototype.getSingleToDoList = function (listId) {
        return this.http.get(this.baseurl + "/toDo/get/todo?listId=" + listId);
    }; // end get single todo list
    HttpService.prototype.deleteToDoList = function (listId) {
        var params = new HttpParams()
            .set('listId', listId);
        return this.http.post(this.baseurl + "/toDo/delete/todolist", params);
    }; // end delete todo list
    HttpService.prototype.createTask = function (data) {
        var params = new HttpParams()
            .set('listId', data.listId)
            .set('taskName', data.taskName);
        return this.http.post(this.baseurl + "/toDo/create/task", params);
    }; // end create task
    HttpService.prototype.getAllTask = function (listId) {
        return this.http.get(this.baseurl + "/toDo/all/todo/tasks?listId=" + listId);
    }; // end get All Tasks
    HttpService.prototype.changeTaskStatus = function (data) {
        var params = new HttpParams()
            .set('taskId', data.taskId)
            .set('status', data.status);
        return this.http.put(this.baseurl + "/toDo/change/task/status", params);
    }; // end change task status
    HttpService.prototype.editTaskName = function (data) {
        var params = new HttpParams()
            .set('listId', data.listId)
            .set('taskId', data.taskId)
            .set('taskName', data.taskName);
        return this.http.put(this.baseurl + "/toDo/edit/task", params);
    }; // end edit Task name
    HttpService.prototype.deleteParticularTask = function (data) {
        var params = new HttpParams()
            .set('listId', data.listId)
            .set('taskId', data.taskId);
        return this.http.post(this.baseurl + "/toDo/delete/task", params);
    }; // end delete particular task
    HttpService.prototype.createSubTask = function (data) {
        var params = new HttpParams()
            .set('taskId', data.taskId)
            .set('subTaskName', data.subTaskName);
        return this.http.post(this.baseurl + "/toDo/create/sub/task", params);
    }; // end create sub Task
    HttpService.prototype.getAllSubTask = function (taskId) {
        return this.http.get(this.baseurl + "/toDo/get/sub/tasks?taskId=" + taskId);
    }; // end get all sub task
    HttpService.prototype.deleteSubTask = function (subTaskId, taskId) {
        var params = new HttpParams()
            .set('subTaskId', subTaskId)
            .set('taskId', taskId);
        return this.http.post(this.baseurl + "/toDo/delete/sub/task", params);
    }; // end delete sub Task
    HttpService.prototype.changeSubTaskStatus = function (data) {
        var params = new HttpParams()
            .set('taskId', data.taskId)
            .set('subTaskId', data.subTaskId)
            .set('status', data.status);
        return this.http.put(this.baseurl + "/toDo/change/subtask/status", params);
    }; // end change sub task status
    HttpService.prototype.editParticaularSubTask = function (data) {
        var params = new HttpParams()
            .set('taskId', data.taskId)
            .set('subTaskId', data.subTaskId)
            .set('subTaskName', data.subTaskName);
        return this.http.put(this.baseurl + "/toDo/edit/sub/task", params);
    }; // end edit particular sub task
    HttpService.prototype.getAllToDoHistory = function (listId) {
        return this.http.get(this.baseurl + "/toDo/get/todo/history?listId=" + listId);
    }; // end get all todo history
    /**
     *
     * Http Request for friend module
     *
    */
    HttpService.prototype.getNonFriendsList = function (userId) {
        return this.http.get(this.baseurl + "/friends/get/non-friends?userId=" + userId);
    }; // end get non friedns list
    HttpService.prototype.findRecievedNotification = function (userId) {
        return this.http.get(this.baseurl + "/friends/get/received/notifications?userId=" + userId);
    }; // end find recieved notificaitions
    HttpService.prototype.findSentNotifications = function (userId) {
        return this.http.get(this.baseurl + "/friends/get/sent/notifications?userId=" + userId);
    }; // end find sent notifications
    HttpService.prototype.getUserReceivedRequests = function (userId) {
        return this.http.get(this.baseurl + "/friends/get/friend-requests?userId=" + userId);
    }; // end get user received requets
    HttpService.prototype.getUserSentRequests = function (userId) {
        return this.http.get(this.baseurl + "/friends/get/sent-requests?userId=" + userId);
    }; // end get user sent requests
    HttpService.prototype.getFriendsList = function (userId) {
        return this.http.get(this.baseurl + "/friends/get/all-friends?userId=" + userId);
    }; // end get friends list
    HttpService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HttpService);
    return HttpService;
}());
export { HttpService };
//# sourceMappingURL=http.service.js.map
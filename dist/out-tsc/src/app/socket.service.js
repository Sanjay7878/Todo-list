import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { HttpClient } from '@angular/common/http';
var SocketService = /** @class */ (function () {
    function SocketService(http) {
        var _this = this;
        this.http = http;
        this.url = "http://todo.sanjayinfotechy.com";
        this.verifyUserConfirmation = function () {
            _this.verifyUser().subscribe(function (data) {
                _this.setUser(Cookie.get('authToken'));
                console.log("User Verified");
            });
        }; // end verify user confirmation
        this.verifyUser = function () {
            return Observable.create(function (observer) {
                _this.socket.on('verify-user', function (data) {
                    observer.next(data);
                });
            });
        }; // end verify user
        this.setUser = function (authToken) {
            _this.socket.emit('set-user', authToken);
        }; // end set user
        this.disconnectSocket = function () {
            return Observable.create(function (observer) {
                _this.socket.on('disconnect', function () {
                    observer.next();
                });
            });
        }; // end disconnect socket
        this.exitSocket = function () {
            _this.socket.disconnect();
        }; // end exit socket
        this.onlineUsers = function () {
            return Observable.create(function (observer) {
                _this.socket.on('online-user-list', function (data) {
                    observer.next(data);
                });
            });
        }; // end online users
        this.undoNewTask = function (historyId) {
            _this.socket.emit('undoTask', historyId);
        }; // end undo new task
        this.undoSubtaskStatus = function (historyId) {
            _this.socket.emit('undoSubTaskStatus', historyId);
        }; // end undo sub task status
        /**
         *
         * Socket events for friends module
         *
         */
        this.sendFriendRequest = function (data) {
            _this.socket.emit('send-friend-request', data);
        }; // end send friend request
        this.acceptFriendRequest = function (data) {
            _this.socket.emit('accept-friend-request', data);
        }; // end accept friend Request
        this.changeFriendRequestStatus = function (data) {
            _this.socket.emit('change-status', data);
        }; // end change friend request status
        this.removeFriend = function (data) {
            _this.socket.emit('remove-friend', data);
        }; // end remove friend
        this.markAsSeen = function (notificationId) {
            _this.socket.emit('mark-seen', notificationId);
        }; // end mark as seen
        // conneting to server side socket
        this.socket = io(this.url);
    }
    SocketService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SocketService);
    return SocketService;
}());
export { SocketService };
//# sourceMappingURL=socket.service.js.map
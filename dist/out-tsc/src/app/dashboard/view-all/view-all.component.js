import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
var ViewAllComponent = /** @class */ (function () {
    function ViewAllComponent(http, toastr, router, _route, socket, spinner, prevLocation) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.router = router;
        this._route = _route;
        this.socket = socket;
        this.spinner = spinner;
        this.prevLocation = prevLocation;
        this.allToDo = [];
        this.allToDoTasks = [];
        this.allSubTasks = [];
        this.logout = function () {
            _this.http.logoutFunction(_this.currentUserId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr("Logout Successful");
                    Cookie.deleteAll();
                    _this.socket.exitSocket();
                    _this.http.deleteUserInfoFromLocalStorage();
                    _this.spinner.show();
                    setTimeout(function () {
                        _this.router.navigate(['/login']);
                        _this.spinner.hide();
                    }, 2000);
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; // end logout
        this.goBack = function () {
            _this.prevLocation.back();
        }; // end go back
        this.getAllToDo = function () {
            _this.http.getAllToDoList(_this.currentUser.userDetails.userId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var todo = _a[_i];
                        _this.allToDo.push(todo);
                        _this.getAllTasks(todo.listId);
                    }
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; //  end get all todo
        this.getAllTasks = function (currentListId) {
            _this.http.getAllTask(currentListId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var task = _a[_i];
                        _this.allToDoTasks.push(task);
                        _this.getSubTasks(task.taskId);
                    }
                }
                else {
                    console.log(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; // end get all tasks
        this.getSubTasks = function (taskId) {
            _this.http.getAllSubTask(taskId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var subtask = _a[_i];
                        _this.allSubTasks.push(subtask);
                    }
                }
                else {
                    console.log(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
            });
        }; // end get Sub task
    }
    ViewAllComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.socket.verifyUserConfirmation();
        setTimeout(function () {
            _this.getAllToDo();
            _this.getSubTasks();
        }, 100);
    };
    ViewAllComponent = tslib_1.__decorate([
        Component({
            selector: 'app-view-all',
            templateUrl: './view-all.component.html',
            styleUrls: ['./view-all.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            Router,
            ActivatedRoute,
            SocketService,
            NgxSpinnerService,
            Location])
    ], ViewAllComponent);
    return ViewAllComponent;
}());
export { ViewAllComponent };
//# sourceMappingURL=view-all.component.js.map
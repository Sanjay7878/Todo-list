import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http, toastr, router, spinner, socket) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.router = router;
        this.spinner = spinner;
        this.socket = socket;
        this.publicToDo = [];
        this.privateToDo = [];
        this.showCreate = "hide";
        this.click = 0;
        this.showCreateToDoForm = function () {
            if (_this.click === 0) {
                _this.showCreate = "show";
                _this.click++;
            }
            else if (_this.click % 2 === 0) {
                _this.showCreate = "show";
                _this.click++;
            }
            else {
                _this.showCreate = "hide";
                _this.click++;
            }
        }; // end show todo create form
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
        this.getUserDetails = function () {
            var data = {
                userId: _this.currentUserId,
                authToken: _this.authToken
            };
            _this.http.getSingleUser(data).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.userDetails = apiResponse.data;
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some error occured");
            });
        }; // end get user details
        this.createToDo = function () {
            if (!_this.listName) {
                _this.toastr.warningToastr('Please provide To-Do List name');
            }
            else if (!_this.visibility) {
                _this.toastr.warningToastr('Prove select the type of visibility');
            }
            else {
                if (_this.visibility == "option1") {
                    _this.visibility = "public";
                }
                else {
                    _this.visibility = "private";
                }
                var data = {
                    userId: _this.currentUserId,
                    listName: _this.listName,
                    visibility: _this.visibility
                };
                _this.http.createToDoList(data).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        _this.toastr.successToastr("To-Do List Created Successfully");
                        _this.spinner.show();
                        setTimeout(function () {
                            location.reload();
                            _this.spinner.hide();
                        }, 1000);
                    }
                    else {
                        _this.toastr.warningToastr(apiResponse.message);
                    }
                }, function (err) {
                    console.log(err);
                    _this.toastr.errorToastr("Some error Occured");
                });
            }
        }; // end create to do list
        this.getAllToDo = function () {
            _this.http.getAllToDoList(_this.currentUserId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var todo = _a[_i];
                        if (todo.visibility === "public") {
                            _this.publicToDo.push(todo);
                        }
                        else {
                            _this.privateToDo.push(todo);
                        }
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
        this.deleteToDo = function (listId) {
            _this.http.deleteToDoList(listId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr("ToDoList Deleted Succesfully");
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; // end delete todo
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        setTimeout(function () {
            _this.getAllToDo();
            _this.getUserDetails();
        }, 100);
        this.socket.verifyUserConfirmation();
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            Router,
            NgxSpinnerService,
            SocketService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map
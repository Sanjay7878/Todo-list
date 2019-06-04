import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { SocketService } from 'src/app/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Location } from '@angular/common';
var SingleFriendComponent = /** @class */ (function () {
    function SingleFriendComponent(http, socket, _route, spinner, router, toastr, prevLocation) {
        var _this = this;
        this.http = http;
        this.socket = socket;
        this._route = _route;
        this.spinner = spinner;
        this.router = router;
        this.toastr = toastr;
        this.prevLocation = prevLocation;
        this.friendToDoList = [];
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
        this.getCurrentFriendDetails = function () {
            var data = {
                authToken: _this.currentUser.authToken,
                userId: _this.friendId
            };
            _this.http.getSingleUser(data).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.friendDetails = apiResponse.data;
                }
                else {
                    console.log(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
            });
        }; // end get current user details
        this.getFriendToDoList = function () {
            _this.http.getAllToDoList(_this.friendId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var todo = _a[_i];
                        if (todo.visibility === "public") {
                            _this.friendToDoList.push(todo);
                        }
                        else {
                            _this.noFriendToDoList = "No Public ToDo Lists";
                        }
                    }
                    console.log(_this.friendToDoList);
                }
                else {
                    console.log(apiResponse.message);
                    _this.noFriendToDoList = apiResponse.message;
                }
            }, function (err) {
                console.log(err);
            });
        }; // end get friend details
    }
    SingleFriendComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socket.verifyUserConfirmation();
        this.friendId = this._route.snapshot.paramMap.get('friendId');
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        setTimeout(function () {
            _this.getCurrentFriendDetails();
            _this.getFriendToDoList();
        }, 100);
    };
    SingleFriendComponent = tslib_1.__decorate([
        Component({
            selector: 'app-single-friend',
            templateUrl: './single-friend.component.html',
            styleUrls: ['./single-friend.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            SocketService,
            ActivatedRoute,
            NgxSpinnerService,
            Router,
            ToastrManager,
            Location])
    ], SingleFriendComponent);
    return SingleFriendComponent;
}());
export { SingleFriendComponent };
//# sourceMappingURL=single-friend.component.js.map
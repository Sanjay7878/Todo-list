import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
var ViewFriendsComponent = /** @class */ (function () {
    function ViewFriendsComponent(http, socket, spinner, router, toastr, prevLocation) {
        var _this = this;
        this.http = http;
        this.socket = socket;
        this.spinner = spinner;
        this.router = router;
        this.toastr = toastr;
        this.prevLocation = prevLocation;
        this.allFriends = [];
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
        this.myFriends = function () {
            _this.http.getFriendsList(_this.currentUserId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    if (apiResponse.data === "No Friends Found") {
                        _this.toastr.infoToastr(apiResponse.data);
                    }
                    else {
                        for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                            var array = _a[_i];
                            for (var _b = 0, _c = array.friends; _b < _c.length; _b++) {
                                var friend = _c[_b];
                                _this.allFriends.push(friend);
                            }
                        }
                    }
                }
                else {
                    console.log(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
            });
        }; // end my friends
        this.unfriend = function (friendId) {
            var data = {
                user: _this.currentUserId,
                friend: friendId
            };
            _this.socket.removeFriend(data);
        }; // end unfriend
        this.goBack = function () {
            _this.prevLocation.back();
        }; // end go back
    }
    ViewFriendsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.socket.verifyUserConfirmation();
        setTimeout(function () {
            _this.myFriends();
        }, 1000);
    };
    ViewFriendsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-view-friends',
            templateUrl: './view-friends.component.html',
            styleUrls: ['./view-friends.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            SocketService,
            NgxSpinnerService,
            Router,
            ToastrManager,
            Location])
    ], ViewFriendsComponent);
    return ViewFriendsComponent;
}());
export { ViewFriendsComponent };
//# sourceMappingURL=view-friends.component.js.map
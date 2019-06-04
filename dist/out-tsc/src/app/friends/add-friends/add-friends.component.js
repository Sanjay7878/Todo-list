import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from 'src/app/socket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
var AddFriendsComponent = /** @class */ (function () {
    function AddFriendsComponent(http, toastr, socket, spinner, router, prevLocation) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.socket = socket;
        this.spinner = spinner;
        this.router = router;
        this.prevLocation = prevLocation;
        this.allNonFriendsList = [];
        this.goBack = function () {
            _this.prevLocation.back();
        }; // end go back
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
        this.allNonFriends = function () {
            _this.http.getNonFriendsList(_this.currentUserId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var nonfriends = _a[_i];
                        _this.allNonFriendsList.push(nonfriends);
                    }
                }
                else {
                    console.log(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
            });
        }; // end all non friends
        this.sendRequest = function (firstName, lastName, id, email, countryCode, mobileNumber) {
            var data = {
                friendName: firstName + ' ' + lastName,
                friendId: id,
                email: email,
                mobileNumber: countryCode + ' ' + mobileNumber
            };
            _this.socket.sendFriendRequest(data);
            _this.toastr.successToastr("Friend Request Sent");
        }; // end send request
    }
    AddFriendsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        setTimeout(function () {
            _this.allNonFriends();
        }, 400);
        this.socket.verifyUserConfirmation();
    };
    AddFriendsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-add-friends',
            templateUrl: './add-friends.component.html',
            styleUrls: ['./add-friends.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            SocketService,
            NgxSpinnerService,
            Router,
            Location])
    ], AddFriendsComponent);
    return AddFriendsComponent;
}());
export { AddFriendsComponent };
//# sourceMappingURL=add-friends.component.js.map
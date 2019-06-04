import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from 'src/app/socket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
var FriendRequestsComponent = /** @class */ (function () {
    function FriendRequestsComponent(http, toastr, socket, spinner, router, prevLocation) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.socket = socket;
        this.spinner = spinner;
        this.router = router;
        this.prevLocation = prevLocation;
        this.receivedRequests = [];
        this.sentRequests = [];
        this.allResponseStatus = ["pending", "decline", "block"];
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
        this.findReceivedRequests = function () {
            _this.http.getUserReceivedRequests(_this.currentUserId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    if (apiResponse.data === "No Pending Requests") {
                        _this.toastr.infoToastr("No Requests Received");
                        _this.noRequests === "No Requests Received";
                    }
                    else {
                        for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                            var array = _a[_i];
                            for (var _b = 0, _c = array.friends; _b < _c.length; _b++) {
                                var friends = _c[_b];
                                if (friends.requestStatus !== "accepted") {
                                    _this.receivedRequests.push(friends);
                                }
                            }
                        }
                    }
                }
                else {
                    _this.toastr.infoToastr(apiResponse.message);
                    _this.noRequests === apiResponse.message;
                }
            }, function (err) {
                console.log(err);
            });
        }; // end find received requests
        this.acceptFriend = function (friendId) {
            var data = {
                friendId: friendId
            };
            _this.socket.acceptFriendRequest(data);
            _this.toastr.successToastr("Friend Successfully Added");
        }; // end accept friend
        this.changeRequestStatus = function (status, friendId) {
            var data = {
                status: status,
                user: _this.currentUserId,
                friend: friendId
            };
            _this.toastr.successToastr("Status Succesfully Changed");
            _this.socket.changeFriendRequestStatus(data);
        }; // end change request status
    }
    FriendRequestsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.socket.verifyUserConfirmation();
        setTimeout(function () {
            _this.findReceivedRequests();
        }, 200);
    };
    FriendRequestsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-friend-requests',
            templateUrl: './friend-requests.component.html',
            styleUrls: ['./friend-requests.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            SocketService,
            NgxSpinnerService,
            Router,
            Location])
    ], FriendRequestsComponent);
    return FriendRequestsComponent;
}());
export { FriendRequestsComponent };
//# sourceMappingURL=friend-requests.component.js.map
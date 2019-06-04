import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
var SentRequestsComponent = /** @class */ (function () {
    function SentRequestsComponent(http, socket, toastr, router, spinner, prevLocation) {
        var _this = this;
        this.http = http;
        this.socket = socket;
        this.toastr = toastr;
        this.router = router;
        this.spinner = spinner;
        this.prevLocation = prevLocation;
        this.sentRequests = [];
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
        this.findUserSentRequests = function () {
            _this.http.getUserSentRequests(_this.currentUserId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    if (apiResponse.data === "No Requests Sent") {
                        _this.toastr.infoToastr("Currently No Requests Are In Pending");
                    }
                    else {
                        for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                            var array = _a[_i];
                            for (var _b = 0, _c = array.friends; _b < _c.length; _b++) {
                                var friend = _c[_b];
                                _this.sentRequests.push(friend);
                            }
                        }
                    }
                }
                else {
                    _this.toastr.infoToastr(apiResponse.message);
                    _this.noSentRequests = apiResponse.message;
                }
            }, function (err) {
                console.log(err);
            });
        }; // end find user sent requests
    }
    SentRequestsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.socket.verifyUserConfirmation();
        setTimeout(function () {
            _this.findUserSentRequests();
        }, 100);
    };
    SentRequestsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sent-requets',
            templateUrl: './sent-requests.component.html',
            styleUrls: ['./sent-requests.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            SocketService,
            ToastrManager,
            Router,
            NgxSpinnerService,
            Location])
    ], SentRequestsComponent);
    return SentRequestsComponent;
}());
export { SentRequestsComponent };
//# sourceMappingURL=sent-requests.component.js.map
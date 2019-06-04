import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
var SentNotificationsComponent = /** @class */ (function () {
    function SentNotificationsComponent(http, socket, toastr, router, spinner, prevLocation) {
        var _this = this;
        this.http = http;
        this.socket = socket;
        this.toastr = toastr;
        this.router = router;
        this.spinner = spinner;
        this.prevLocation = prevLocation;
        this.sentNotifications = [];
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
        this.getSentNotifications = function () {
            _this.http.findSentNotifications(_this.currentUserId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var requests = _a[_i];
                        if (requests.senderName === _this.currentUser.userDetails.firstName + ' ' + _this.currentUser.userDetails.lastName) {
                            _this.sentNotifications.push(requests);
                        }
                    }
                }
                else {
                    console.log(apiResponse.message);
                    _this.toastr.infoToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
            });
        }; // end get sent notifications
    }
    SentNotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.socket.verifyUserConfirmation();
        setTimeout(function () {
            _this.getSentNotifications();
        }, 100);
    };
    SentNotificationsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sent-notifications',
            templateUrl: './sent-notifications.component.html',
            styleUrls: ['./sent-notifications.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            SocketService,
            ToastrManager,
            Router,
            NgxSpinnerService,
            Location])
    ], SentNotificationsComponent);
    return SentNotificationsComponent;
}());
export { SentNotificationsComponent };
//# sourceMappingURL=sent-notifications.component.js.map
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(http, socket, toastr, spinner, router, prevLocation) {
        var _this = this;
        this.http = http;
        this.socket = socket;
        this.toastr = toastr;
        this.spinner = spinner;
        this.router = router;
        this.prevLocation = prevLocation;
        this.currentNotifcations = [];
        this.allUser = [];
        this.notifications = [];
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
        this.receivedNotifcations = function () {
            _this.http.findRecievedNotification(_this.currentUserId).subscribe(function (apiResPonse) {
                if (apiResPonse.status === 200) {
                    for (var i = 0; i < apiResPonse.data.length; i++) {
                        if (_this.currentNotifcations.length === 0) {
                            _this.currentNotifcations = apiResPonse.data;
                        }
                        else if (apiResPonse.data[i] !== _this.currentNotifcations[i]) {
                            _this.currentNotifcations.push(apiResPonse.data[i]);
                        }
                        else {
                            _this.currentNotifcations;
                        }
                        if (apiResPonse.data[i].seen == false) {
                            _this.toastr.successToastr(apiResPonse.data[i].message + " from " + apiResPonse.data[i].senderName);
                        }
                    }
                }
                else {
                    console.log(apiResPonse.message);
                }
            }, function (err) {
                console.log(err);
            });
        }; // end received notifications
        this.markNotificationAsSeen = function (notificationId) {
            _this.socket.markAsSeen(notificationId);
            _this.toastr.successToastr("Marked as seen");
        }; // end mark notification as seen
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.receivedNotifcations();
        this.socket.verifyUserConfirmation();
    };
    NotificationsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-notifications',
            templateUrl: './notifications.component.html',
            styleUrls: ['./notifications.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            SocketService,
            ToastrManager,
            NgxSpinnerService,
            Router,
            Location])
    ], NotificationsComponent);
    return NotificationsComponent;
}());
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map
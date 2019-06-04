import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';
import { Location } from '@angular/common';
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(http, toastr, router, spinner, socket, prevLocation) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.router = router;
        this.spinner = spinner;
        this.socket = socket;
        this.prevLocation = prevLocation;
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
        this.changeExistingPassword = function () {
            var data = {
                email: _this.currentUser.userDetails.email,
                password: _this.currentPassword
            };
            _this.http.loginFunction(data).subscribe(function (apiResponse) {
                if (apiResponse.status == 200) {
                    Cookie.deleteAll();
                    _this.http.deleteUserInfoFromLocalStorage();
                    Cookie.set('authToken', apiResponse.data.authToken);
                    Cookie.set('fullName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
                    Cookie.set('userId', apiResponse.data.userDetails.userId);
                    _this.http.setUserInfoToLocalStorage(apiResponse.data);
                    _this.changePassword();
                }
                else {
                    _this.toastr.warningToastr('Current Password Does Not Match');
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr(err.error.message);
            });
        }; // end login details
        this.changePassword = function () {
            if (!_this.newPassword) {
                _this.toastr.warningToastr("Please Provide a New Password");
            }
            else if (!_this.confirmPassword) {
                _this.toastr.warningToastr("Please provide confirmation password");
            }
            else if (_this.confirmPassword !== _this.newPassword) {
                _this.toastr.errorToastr("New Password and Confirm Password Does not Match");
            }
            else {
                var data = {
                    userId: _this.currentUser.userDetails.userId,
                    authToken: _this.currentUser.authToken,
                    password: _this.newPassword
                };
                _this.http.changePassword(data).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        _this.toastr.successToastr("Password Successfully changed");
                        _this.spinner.show();
                        setTimeout(function () {
                            _this.router.navigate(['/dashboard']);
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
            }
        }; // end change password
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.socket.verifyUserConfirmation();
    };
    ChangePasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html',
            styleUrls: ['./change-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            Router,
            NgxSpinnerService,
            SocketService,
            Location])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
export { ChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map
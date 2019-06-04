import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cookie } from 'ng2-cookies';
import { Location } from '@angular/common';
import { SocketService } from 'src/app/socket.service';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(http, toastr, router, spinner, prevLocation, socket) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.router = router;
        this.spinner = spinner;
        this.prevLocation = prevLocation;
        this.socket = socket;
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
        this.getUserDetails = function () {
            var data = {
                userId: _this.currentUserId,
                authToken: _this.authToken
            };
            _this.http.getSingleUser(data).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.currentUserDetails = apiResponse.data;
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some error occured");
            });
        }; // end get user details
        this.editDetails = function () {
            var data = {
                authToken: _this.authToken,
                userId: _this.currentUserId,
                firstName: _this.currentUserDetails.firstName,
                lastName: _this.currentUserDetails.lastName,
                country: _this.currentUserDetails.country,
                countryCode: _this.currentUserDetails.countryCode,
                mobileNumber: _this.currentUserDetails.mobileNumber,
                email: _this.currentUserDetails.email
            };
            _this.http.editUserDetails(data).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr("User Details Edited Successfully");
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
        }; // end edit Details
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.getUserDetails();
        this.socket.verifyUserConfirmation();
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            Router,
            NgxSpinnerService,
            Location,
            SocketService])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map
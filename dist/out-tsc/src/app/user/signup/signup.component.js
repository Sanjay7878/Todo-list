import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(_http, toastr, router) {
        var _this = this;
        this._http = _http;
        this.toastr = toastr;
        this.router = router;
        this.signupFunction = function () {
            if (!_this.firstName) {
                _this.toastr.warningToastr("Please provide your First Name");
            }
            else if (!_this.lastName) {
                _this.toastr.warningToastr("Please provide your Last Name");
            }
            else if (!_this.country) {
                _this.toastr.warningToastr("Please provide your Country Name");
            }
            else if (!_this.countryCode) {
                _this.toastr.warningToastr("Please provide your Country Code");
            }
            else if (!_this.mobileNumber) {
                _this.toastr.warningToastr("Please provide your Mobile Number/Contact Number");
            }
            else if (!_this.email) {
                _this.toastr.warningToastr("Please provide your Email Address");
            }
            else if (!_this.password) {
                _this.toastr.warningToastr("Please provide a Password");
            }
            else {
                var data = {
                    firstName: _this.firstName.toLowerCase(),
                    lastName: _this.lastName.toLowerCase(),
                    country: _this.country.toLowerCase(),
                    countryCode: _this.countryCode.toLowerCase(),
                    mobileNumber: _this.mobileNumber,
                    email: _this.email.toLowerCase(),
                    password: _this.password.toLowerCase()
                };
                _this._http.signupFunction(data).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        _this.toastr.successToastr('Registration Succesfull');
                        setTimeout(function () {
                            _this.router.navigate(['/login']);
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
        }; // end signup function
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService, ToastrManager, Router])
    ], SignupComponent);
    return SignupComponent;
}());
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map
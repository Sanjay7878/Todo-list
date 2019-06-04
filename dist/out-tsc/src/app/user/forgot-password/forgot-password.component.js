import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(http, toastr, _route, spinner, router) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this._route = _route;
        this.spinner = spinner;
        this.router = router;
        this.resetPassword = function () {
            if (!_this.password) {
                _this.toastr.warningToastr('Please Provide a Password');
            }
            else if (!_this.confirmPassword) {
                _this.toastr.warningToastr('Please Provide a Confirmation Password');
            }
            else if (_this.password !== _this.confirmPassword) {
                _this.toastr.errorToastr('Password Does not match');
            }
            else {
                var data = {
                    userId: _this.userId,
                    password: _this.password
                };
                _this.http.resetForgotPassword(data).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        _this.toastr.successToastr("Password Reset Successful");
                        _this.spinner.show();
                        setTimeout(function () {
                            _this.router.navigate(['/login']);
                        }, 2000);
                    }
                });
            }
        }; // end reset password
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.userId = this._route.snapshot.paramMap.get('userId');
    };
    ForgotPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-forgot-password',
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./forgot-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            ActivatedRoute,
            NgxSpinnerService,
            Router])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
export { ForgotPasswordComponent };
//# sourceMappingURL=forgot-password.component.js.map
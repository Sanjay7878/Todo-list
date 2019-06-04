import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
var ForgotPasswordEmailComponent = /** @class */ (function () {
    function ForgotPasswordEmailComponent(http, spinner, router, toastr) {
        var _this = this;
        this.http = http;
        this.spinner = spinner;
        this.router = router;
        this.toastr = toastr;
        this.sendForgotPassword = function () {
            var email = _this.email.toLowerCase();
            _this.http.forgotPasswordLink(email).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr('Email has been Sent with the Password-reset Link');
                    setTimeout(function () {
                        _this.router.navigate(['/passwordLink-notification']);
                    }, 2000);
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr('Some Error Occured');
            });
        }; // end forgot password
    }
    ForgotPasswordEmailComponent.prototype.ngOnInit = function () {
    };
    ForgotPasswordEmailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-forgot-password-email',
            templateUrl: './forgot-password-email.component.html',
            styleUrls: ['./forgot-password-email.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService, NgxSpinnerService, Router, ToastrManager])
    ], ForgotPasswordEmailComponent);
    return ForgotPasswordEmailComponent;
}());
export { ForgotPasswordEmailComponent };
//# sourceMappingURL=forgot-password-email.component.js.map
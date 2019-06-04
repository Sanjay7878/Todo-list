import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, toastr, router, spinner) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.router = router;
        this.spinner = spinner;
        this.loginUser = function () {
            var data = {
                email: _this.email,
                password: _this.password
            };
            _this.http.loginFunction(data).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr('Login Successful');
                    Cookie.set('authToken', apiResponse.data.authToken);
                    Cookie.set('fullName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
                    Cookie.set('userId', apiResponse.data.userDetails.userId);
                    _this.http.setUserInfoToLocalStorage(apiResponse.data);
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
                _this.toastr.errorToastr(err.error.message);
            });
        }; // end login user 
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            Router,
            NgxSpinnerService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var SendForgotPasswordLinkComponent = /** @class */ (function () {
    function SendForgotPasswordLinkComponent(router) {
        var _this = this;
        this.router = router;
        this.resendEmail = function () {
            _this.router.navigate(['/forgot-password-email']);
        }; // end resent email
    }
    SendForgotPasswordLinkComponent.prototype.ngOnInit = function () {
    };
    SendForgotPasswordLinkComponent = tslib_1.__decorate([
        Component({
            selector: 'app-send-forgot-password-link',
            templateUrl: './send-forgot-password-link.component.html',
            styleUrls: ['./send-forgot-password-link.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], SendForgotPasswordLinkComponent);
    return SendForgotPasswordLinkComponent;
}());
export { SendForgotPasswordLinkComponent };
//# sourceMappingURL=send-forgot-password-link.component.js.map
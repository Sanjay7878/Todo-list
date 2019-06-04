import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HomeComponent } from '../dashboard/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SendForgotPasswordLinkComponent } from './send-forgot-password-link/send-forgot-password-link.component';
import { ForgotPasswordEmailComponent } from './forgot-password-email/forgot-password-email.component';
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = tslib_1.__decorate([
        NgModule({
            declarations: [LoginComponent, ForgotPasswordComponent, SendForgotPasswordLinkComponent, ForgotPasswordEmailComponent],
            imports: [
                CommonModule,
                DashboardModule,
                SharedModule,
                NgxSpinnerModule,
                FormsModule,
                RouterModule.forChild([
                    { path: 'login', component: LoginComponent },
                    { path: 'forgot-password-email', component: ForgotPasswordEmailComponent },
                    { path: 'passwordLink-notification', component: SendForgotPasswordLinkComponent },
                    { path: ':userId/reset-password', component: ForgotPasswordComponent },
                    { path: 'dashboard', component: HomeComponent }
                ]),
                FormsModule
            ]
        })
    ], UserModule);
    return UserModule;
}());
export { UserModule };
//# sourceMappingURL=user.module.js.map
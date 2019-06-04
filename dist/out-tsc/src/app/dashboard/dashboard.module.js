import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { FriendsModule } from '../friends/friends.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalComponent } from '../shared/modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { SocketService } from '../socket.service';
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule.prototype.ngOnInit = function () {
    };
    DashboardModule = tslib_1.__decorate([
        NgModule({
            declarations: [HomeComponent, ProfileComponent, ModalComponent, ChangePasswordComponent, TaskViewComponent, ViewAllComponent],
            imports: [
                CommonModule,
                FormsModule,
                NgxSpinnerModule,
                SharedModule,
                FriendsModule,
                RouterModule.forChild([
                    { path: 'profile', component: ProfileComponent },
                    { path: 'change/password', component: ChangePasswordComponent },
                    { path: 'list/view/:listId', component: TaskViewComponent },
                    { path: 'all/todo/view', component: ViewAllComponent }
                ])
            ],
            providers: [SocketService]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DashboardModule);
    return DashboardModule;
}());
export { DashboardModule };
//# sourceMappingURL=dashboard.module.js.map
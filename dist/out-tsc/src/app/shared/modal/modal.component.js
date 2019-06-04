import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
var ModalComponent = /** @class */ (function () {
    function ModalComponent(http, toastr) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.deleteToDo = function () {
            _this.http.deleteToDoList(_this.listId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr("ToDoList Deleted Succesfully");
                    console.log(location.origin);
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; // end delete todo
    }
    ModalComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ModalComponent.prototype, "listId", void 0);
    ModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modal',
            templateUrl: './modal.component.html',
            styleUrls: ['./modal.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService, ToastrManager])
    ], ModalComponent);
    return ModalComponent;
}());
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map
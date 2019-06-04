import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryCodeComponent } from './country-code/country-code.component';
import { NgxSpinnerModule } from "ngx-spinner";
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            declarations: [CountryCodeComponent],
            imports: [
                CommonModule,
                FormsModule,
                NgxSpinnerModule
            ],
            exports: [CountryCodeComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map
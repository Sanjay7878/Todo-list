import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryCodeComponent } from './country-code/country-code.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [ CountryCodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [CountryCodeComponent]
})
export class SharedModule { }

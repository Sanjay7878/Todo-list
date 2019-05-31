import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner'
import { RouterModule, Routes } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './user/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FriendsModule } from './friends/friends.module';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    UserModule,
    FriendsModule,
    DashboardModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'signup', component: SignupComponent},
      {path: '', redirectTo: 'signup', pathMatch: 'full'}
    ])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

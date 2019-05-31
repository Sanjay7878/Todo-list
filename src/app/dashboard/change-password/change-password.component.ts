import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  
  public currentPassword;
  public newPassword;
  public confirmPassword;
  public currentUserId;
  public currentUser;
  public authToken;
  constructor(
    private http: HttpService, 
    private toastr: ToastrManager, 
    private router: Router, 
    private spinner: NgxSpinnerService, 
    private socket: SocketService) { }

  ngOnInit() {
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    this.socket.verifyUserConfirmation()
  }

  public logout: any = ()=>{
    this.http.logoutFunction(this.currentUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr("Logout Successful")
          Cookie.deleteAll()
          this.socket.exitSocket()
          this.http.deleteUserInfoFromLocalStorage()
          this.spinner.show()
          setTimeout(()=>{
            this.router.navigate(['/login'])
            this.spinner.hide()
          }, 2000)
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some Error Occured")
      }
    )
  } // end logout

  public changeExistingPassword: any = () =>{
    let data ={
      email: this.currentUser.userDetails.email,
      password: this.currentPassword
    }

    this.http.loginFunction(data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status == 200){

          Cookie.deleteAll()
          this.http.deleteUserInfoFromLocalStorage()
          Cookie.set('authToken', apiResponse.data.authToken)
          Cookie.set('fullName', apiResponse.data.userDetails.firstName+' '+apiResponse.data.userDetails.lastName)
          Cookie.set('userId', apiResponse.data.userDetails.userId)
          this.http.setUserInfoToLocalStorage(apiResponse.data)
          this.changePassword()
        }else{
          this.toastr.warningToastr('Current Password Does Not Match')
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr(err.error.message)
      }
    )
  } // end login details

  public changePassword: any = () =>{
    if(!this.newPassword){
      this.toastr.warningToastr("Please Provide a New Password")
    } else if(!this.confirmPassword){
      this.toastr.warningToastr("Please provide confirmation password")
    } else if(this.confirmPassword !== this.newPassword){
      this.toastr.errorToastr("New Password and Confirm Password Does not Match")
    } else {
      let data ={
        userId: this.currentUser.userDetails.userId,
        authToken: this.currentUser.authToken,
        password: this.newPassword
      }

      this.http.changePassword(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("Password Successfully changed")
            this.spinner.show()
            setTimeout(() => {
              this.router.navigate(['/dashboard'])
              this.spinner.hide()
            }, 2000);
          } else {
            this.toastr.warningToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Some Error Occured")
        }
      )
    }
  } // end change password
}

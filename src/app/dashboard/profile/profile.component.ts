import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {Cookie} from 'ng2-cookies'
import { Location } from '@angular/common';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUserId;
  public authToken;
  public currentUser;
  public currentUserDetails;
  public firstName;
  public lastName;
  public country;
  public countryCode;
  public mobileNumber;
  public email;

  constructor(
    private http: HttpService, 
    private toastr: ToastrManager, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private prevLocation: Location,
    private socket: SocketService) { }

  ngOnInit() {
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    this.getUserDetails()
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

  public goBack: any = ()=>{
    this.prevLocation.back()
  } // end go back

  public getUserDetails: any = ()=>{
    let data = {
      userId: this.currentUserId,
      authToken: this.authToken
    }
    
    this.http.getSingleUser(data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.currentUserDetails = apiResponse.data
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some error occured")
      }
    )
  } // end get user details

  public editDetails: any = ()=>{
      let data = {
        authToken: this.authToken,
        userId: this.currentUserId,
        firstName: this.currentUserDetails.firstName,
        lastName: this.currentUserDetails.lastName,
        country: this.currentUserDetails.country,
        countryCode: this.currentUserDetails.countryCode,
        mobileNumber: this.currentUserDetails.mobileNumber,
        email: this.currentUserDetails.email
      }

      this.http.editUserDetails(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("User Details Edited Successfully")
            setTimeout(()=>{
              location.reload()
            }, 1000)
          }else {
            this.toastr.warningToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Some Error Occured")
        }
      )
  } // end edit Details
}

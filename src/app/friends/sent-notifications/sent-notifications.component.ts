import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sent-notifications',
  templateUrl: './sent-notifications.component.html',
  styleUrls: ['./sent-notifications.component.css']
})
export class SentNotificationsComponent implements OnInit {

  public currentUserId: String
  public sentNotifications= []
  public currentUser: any
  public authToken: String

  constructor(
    private http: HttpService, 
    private socket: SocketService, 
    private toastr: ToastrManager,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    this.socket.verifyUserConfirmation()
    setTimeout(() => {
      this.getSentNotifications()
    }, 100);
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

  public getSentNotifications: any = ()=>{
    this.http.findSentNotifications(this.currentUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          for(let requests of apiResponse.data){
            if(requests.senderName === this.currentUser.userDetails.firstName+' '+this.currentUser.userDetails.lastName){
              this.sentNotifications.push(requests)
            }
          }
        } else {
          console.log(apiResponse.message)
          this.toastr.infoToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get sent notifications
}

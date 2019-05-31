import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public currentNotifcations= []
  public allUser= []
  public notifications= []
  public currentUser: any
  public currentUserId: String
  public authToken: String
  
  constructor(
    private http: HttpService, 
    private socket: SocketService,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    this.receivedNotifcations()
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

  public receivedNotifcations: any =()=>{
    this.http.findRecievedNotification(this.currentUserId).subscribe(
      (apiResPonse)=>{
        if(apiResPonse.status === 200){
          for(let i=0; i<apiResPonse.data.length; i++){
            if(this.currentNotifcations.length === 0){
              this.currentNotifcations = apiResPonse.data
            }else if(apiResPonse.data[i] !== this.currentNotifcations[i]){
              this.currentNotifcations.push(apiResPonse.data[i])
              
            } else {
              this.currentNotifcations
            }
            if(apiResPonse.data[i].seen == false){
              this.toastr.successToastr(`${apiResPonse.data[i].message} from ${apiResPonse.data[i].senderName}`)
            }
          }
        } else {
          console.log(apiResPonse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end received notifications

  public markNotificationAsSeen: any = (notificationId)=>{
    this.socket.markAsSeen(notificationId)
    this.toastr.successToastr("Marked as seen")
  } // end mark notification as seen

}

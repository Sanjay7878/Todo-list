import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sent-requets',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.css']
})
export class SentRequestsComponent implements OnInit {

  public currentUserId: String
  public sentRequests= []
  public noSentRequests: String
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
    setTimeout(()=>{
      this.findUserSentRequests()
    }, 100)
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

  public findUserSentRequests: any =()=>{ 
    this.http.getUserSentRequests(this.currentUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          if(apiResponse.data === "No Requests Sent"){
            this.toastr.infoToastr("Currently No Requests Are In Pending")
          } else{
            for(let array of apiResponse.data){
              for(let friend of array.friends){
                this.sentRequests.push(friend)
              }
            }
          }
        }else{
          this.toastr.infoToastr(apiResponse.message)
          this.noSentRequests = apiResponse.message
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end find user sent requests

}

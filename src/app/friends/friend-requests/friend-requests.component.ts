import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as $ from 'jquery'
import { SocketService } from 'src/app/socket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
  public currentUser: any
  public currentUserId: String
  public receivedRequests= []
  public noRequests: String
  public sentRequests =[]
  public allResponseStatus = ["pending", "decline", "block"]
  public authToken: String

  constructor(
    private http: HttpService, 
    private toastr: ToastrManager, 
    private socket: SocketService,
     private spinner: NgxSpinnerService,
     private router: Router) { }

  ngOnInit() {
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    this.socket.verifyUserConfirmation()
    setTimeout(() => {
      this.findReceivedRequests()
    }, 200);
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


  public findReceivedRequests: any = ()=>{
    this.http.getUserReceivedRequests(this.currentUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          if(apiResponse.data === "No Pending Requests"){
            this.toastr.infoToastr("No Requests Received")
            this.noRequests === "No Requests Received"
          }else {
            for(let array of apiResponse.data){
              for(let friends of array.friends){
                if(friends.requestStatus !== "accepted"){
                  this.receivedRequests.push(friends)
                }
              }
            }
          }
        } else{
          this.toastr.infoToastr(apiResponse.message)
          this.noRequests === apiResponse.message
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end find received requests

  public acceptFriend: any =(friendId)=>{
    let data ={
      friendId:friendId
    }
    this.socket.acceptFriendRequest(data)
    this.toastr.successToastr("Friend Successfully Added")
  } // end accept friend

  public changeRequestStatus: any = (status, friendId)=>{
    let data = {
      status: status,
      user: this.currentUserId,
      friend: friendId
    }
    this.toastr.successToastr("Status Succesfully Changed")
    this.socket.changeFriendRequestStatus(data)
  } // end change request status
}

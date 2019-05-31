import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-friends',
  templateUrl: './view-friends.component.html',
  styleUrls: ['./view-friends.component.css']
})
export class ViewFriendsComponent implements OnInit {

  public currentUserId;
  public allFriends =[]
  public currentUser: any
  public authToken: String
  constructor(
    private http: HttpService, 
    private socket: SocketService, 
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrManager) { }

  ngOnInit() {
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    this.socket.verifyUserConfirmation()
    setTimeout(() => {
      this.myFriends()
    }, 1000);

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


  public myFriends: any = ()=>{
    this.http.getFriendsList(this.currentUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          if(apiResponse.data === "No Friends Found"){
            this.toastr.infoToastr(apiResponse.data)
          }else{
            for(let array of apiResponse.data){
              for(let friend of array.friends){
                this.allFriends.push(friend)
              }
            }
          }
        }else {
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end my friends

  public unfriend: any =(friendId)=>{
    let data ={
      user: this.currentUserId,
      friend: friendId
    }
    this.socket.removeFriend(data)
  } // end unfriend
}

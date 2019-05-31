import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from 'src/app/socket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {

  private currentUser:any
  public allNonFriendsList= []
  public currentUserId: String
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
    setTimeout(()=>{
      this.allNonFriends()
    }, 400)

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

  public allNonFriends: any = ()=>{
    this.http.getNonFriendsList(this.currentUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          for(let nonfriends of apiResponse.data){
            this.allNonFriendsList.push(nonfriends)
          }
        } else {
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end all non friends

  public sendRequest: any = (firstName,lastName, id, email, countryCode, mobileNumber)=>{
    let data = {
      friendName: firstName+' '+lastName,
      friendId: id,
      email: email, 
      mobileNumber:countryCode+' '+mobileNumber
    }
    this.socket.sendFriendRequest(data)
    this.toastr.successToastr("Friend Request Sent")
  } // end send request
}

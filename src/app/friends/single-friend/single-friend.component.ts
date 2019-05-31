import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { SocketService } from 'src/app/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-single-friend',
  templateUrl: './single-friend.component.html',
  styleUrls: ['./single-friend.component.css']
})
export class SingleFriendComponent implements OnInit {

  public friendId: String
  public friendDetails: any
  public friendToDoList= []
  public noFriendToDoList: String
  public currentUser: any
  public currentUserId: String
  public authToken: String

  constructor(
    private http: HttpService, 
    private socket: SocketService,
    private _route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrManager) { }

  ngOnInit() {
    this.socket.verifyUserConfirmation()
    this.friendId = this._route.snapshot.paramMap.get('friendId')
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    console.log(this.currentUserId)
    setTimeout(() => {
      this.getCurrentFriendDetails()
      this.getFriendToDoList()
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

  public getCurrentFriendDetails: any =()=>{
    let data = {
      authToken: this.currentUser.authToken,
      userId: this.friendId
    }
    this.http.getSingleUser(data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.friendDetails = apiResponse.data
        }else{
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get current user details

  public getFriendToDoList: any = ()=>{
    this.http.getAllToDoList(this.friendId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          for(let todo of apiResponse.data){
            if(todo.visibility === "public"){
              this.friendToDoList.push(todo)
            } else{
              this.noFriendToDoList = "No Public ToDo Lists"
            }
          }
          console.log(this.friendToDoList)
        }else{
          console.log(apiResponse.message)
          this.noFriendToDoList = apiResponse.message
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get friend details

}

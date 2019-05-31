import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cookie} from 'ng2-cookies'
import * as $ from 'jquery'
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentUser;
  public userDetails;
  public listName;
  public visibility;
  public publicToDo: any = []
  public privateToDo: any = []
  public totalTasks;
  public authToken: String
  public currentUserId: String
  public toggleCreate: string

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
    setTimeout(() => {
      this.getAllToDo()
      this.getUserDetails()
    }, 100);
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

  public getUserDetails: any = ()=>{
    let data = {
      userId: this.currentUserId,
      authToken: this.authToken
    }

    this.http.getSingleUser(data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.userDetails = apiResponse.data
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

  public createToDo: any = ()=>{
    if(!this.listName){
      this.toastr.warningToastr('Please provide To-Do List name')
    } else if(!this.visibility){
      this.toastr.warningToastr('Prove select the type of visibility')
    } else {
      if(this.visibility == "option1"){
        this.visibility = "public"
      } else {
        this.visibility = "private"
      }
      let data =  {
        userId: this.currentUserId,
        listName: this.listName,
        visibility: this.visibility
      }
      this.http.createToDoList(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("To-Do List Created Successfully")
            this.spinner.show()
            setTimeout(()=>{
              location.reload()
              this.spinner.hide()
            }, 1000)
          } else {
            this.toastr.warningToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Some error Occured")
        }
      )
    }
    
  } // end create to do list

  public getAllToDo: any = ()=>{
    
    this.http.getAllToDoList(this.currentUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          for(let todo of apiResponse.data){
            if(todo.visibility === "public"){
              this.publicToDo.push(todo)
            } else {
              this.privateToDo.push(todo)
            }
          }
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some Error Occured")
      }
    )
  } //  end get all todo

  public deleteToDo: any = (listId)=>{
    this.http.deleteToDoList(listId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr("ToDoList Deleted Succesfully")
          setTimeout(() => {
            location.reload()
          }, 1000);
        }else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some Error Occured")
      }
    )
  } // end delete todo

} 

import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  
  public currentUser: any
  public allToDo =[]
  public allToDoTasks =[]
  public allSubTasks= []
  public currentUserId: String
  public authToken: String
  constructor(
    private http: HttpService, 
    private toastr: ToastrManager, 
    private router: Router, 
    private _route: ActivatedRoute,
    private socket: SocketService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    this.socket.verifyUserConfirmation()
    setTimeout(() => {
      this.getAllToDo()
      this.getSubTasks()
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

  public getAllToDo: any = ()=>{ 
    this.http.getAllToDoList(this.currentUser.userDetails.userId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          for(let todo of apiResponse.data){
            this.allToDo.push(todo)
            this.getAllTasks(todo.listId)
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

  public getAllTasks: any = (currentListId)=>{
    this.http.getAllTask(currentListId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          for(let task of apiResponse.data){
            this.allToDoTasks.push(task)
            this.getSubTasks(task.taskId)
          }
        } else {
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some Error Occured")
      }
    )
  } // end get all tasks

  public getSubTasks: any = (taskId)=>{
    this.http.getAllSubTask(taskId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          for(let subtask of apiResponse.data){
            this.allSubTasks.push(subtask)
          }
        } else {
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get Sub task

}

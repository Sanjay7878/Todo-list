import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  public currentListId: String
  public currentList: any
  public allToDoTasks: any
  public taskName: String
  public editTaskName: String
  public editSubTaskName: String
  public taskStatus= []
  public subTaskStatus= []
  public status: String
  public subTaskName: String
  public taskIdForSubTask: String
  public allSubTasks: any
  public historyDetails= []
  public allStatus = ['open', 'done']
  public currentUser: any
  public currentUserId: String
  public authToken: String
  constructor(
    private http: HttpService, 
    private toastr: ToastrManager, 
    private router: Router, 
    private _route: ActivatedRoute,
    private socket: SocketService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.currentListId = this._route.snapshot.paramMap.get('listId')
    this.currentUser = this.http.getUserInfoFromLocalStorage()
    this.currentUserId = this.currentUser.userDetails.userId
    this.authToken = this.currentUser.authToken
    this.getCurrentToDolist()
    setTimeout(()=>{
      this.getAllTasks()
      this.getAllHistory()
    }, 200)
    setTimeout(()=>{
      this.getSubTasks()
    }, 500)
    jQuery.type($('.editSubTask').hide())
    this.socket.verifyUserConfirmation()
  }

  
  // jquery functions 
  public showSubTask = (taskId)=>{
    jQuery.type($('#createSubTask').toggle())
    this.taskIdForSubTask = taskId
  }
  public hideEdit =()=>{
    jQuery.type($('.editTask').hide())
  }
  public hideEditSub =()=>{
    jQuery.type($('.editSubTask').hide())
  }
  public editToggle = ()=>{
    jQuery.type($('.editTask').slideToggle())
  }
  public editSubToggle = ()=>{
    jQuery.type($('.editSubTask').slideToggle())
  }


  // End jquery functions

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

  public getCurrentToDolist: any = ()=>{
    this.http.getSingleToDoList(this.currentListId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.currentList = apiResponse.data
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some Error Occured")
      }
    )
  } // end get current toDo list

  // Task Related Functions
  public createNewTask: any = ()=>{
    if(!this.taskName){
      this.toastr.warningToastr("Please Provide A Task Name")
    } else{
      let data = {
        listId: this.currentListId,
        taskName: this.taskName
      }
      this.http.createTask(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("Task Successfully Created")
            setTimeout(() => {
              location.reload()
            }, 1500);
          } else {
            this.toastr.errorToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Some Error Occured")
        }
      )
    }
  } // end create Task

  public getAllTasks: any = ()=>{
    this.http.getAllTask(this.currentListId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.allToDoTasks = apiResponse.data
          for(let tasks of this.allToDoTasks){
            let statusDetails ={
              taskId: tasks.taskId,
              status: tasks.status
            }
            this.taskStatus.push(statusDetails)
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

  public deleteTask: any = (listId, taskId)=>{
    let data= {
      listId: listId,
      taskId: taskId
    }
    this.http.deleteParticularTask(data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr("Task Deleted")
          setTimeout(() => {
            location.reload()
          }, 500);
        }else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some error Occured")
      }
    )
  } // end delete task

  public changeTaskStatus: any = (taskId, status)=>{
    for(let taskDetails of this.taskStatus){
      if(taskDetails.taskId === taskId){
        if(taskDetails.status === status){
          this.toastr.infoToastr("No Changes Was Done")
        }else{
          let data = {
            status: status,
            taskId: taskId
          }
          this.http.changeTaskStatus(data).subscribe(
            (apiResponse)=>{
              if(apiResponse.status === 200){
                this.toastr.successToastr('Status Changed')
                setTimeout(() => {
                  location.reload()
                }, 500);
              } else{
                this.toastr.warningToastr(apiResponse.message)
              }
            },
            (err)=>{
              console.log(err)
              this.toastr.errorToastr("Some error occured")
            }
          )
        }
      }
    }
    
  } // end change task status

  public editTask: any = (taskId, listId)=>{
    if(!this.editTaskName){
      this.toastr.warningToastr("Please Provide a Task Name")
    } else{
      let data ={
        listId: listId,
        taskName: this.editTaskName,
        taskId: taskId
      }
      this.http.editTaskName(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("Task Name Edited")
            setTimeout(() => {
              location.reload()
            }, 1000);
          }else {
            this.toastr.warningToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Some error occured")
        }
      )
    }
  } // end edit task

  //End Task Related Functions

  //Sub Task related Functions
  public newSubTask: any = (taskId) =>{
    if(!this.subTaskName){
      this.toastr.warningToastr("Please Provide SubTask Name")
    } else {
      let data = {
        taskId: this.taskIdForSubTask,
        subTaskName: this.subTaskName
      }
      
      this.http.createSubTask(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr('SubTask Created')
            setTimeout(() => {
              location.reload()
            }, 1500);
          } else{
            this.toastr.warningToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Some error Occured")
        }
      )
    }
    
  } // end new subtask

  public getSubTasks: any = ()=>{
    for(let task of this.allToDoTasks){
      this.http.getAllSubTask(task.taskId).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.allSubTasks = apiResponse.data
            for(let subTask of this.allSubTasks){
              let statusDetails = {
                subTaskId: subTask.subTaskId,
                status: subTask.status
              }
              this.subTaskStatus.push(statusDetails)
            }
          } else {
            console.log(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
        }
      )
    }
    
  } // end get Sub task

  public deleteSubTask: any = (subtaskId, taskId)=>{
    this.http.deleteSubTask(subtaskId, taskId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr('Sub Task Deleted')
          setTimeout(() => {
            location.reload()
          }, 1000);
        }else{
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some Error Occured")
      }
    )
  } // end delete Sub task

  public changeSubTaskStatus: any = (subTaskId, status, taskId)=>{
    for(let subTaskDetails of this.subTaskStatus){
      if(subTaskDetails.subTaskId === subTaskId){
        if(subTaskDetails.status === status){
          this.toastr.infoToastr("No Changes was done")
        }else {
          let data ={
            taskId: taskId,
            subTaskId: subTaskId,
            status: status
          }
          this.http.changeSubTaskStatus(data).subscribe(
            (apiResponse)=>{
              if(apiResponse.status === 200){
                this.toastr.successToastr("Status Changed")
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
        }
      }
    }
  } // end change sub task status

  public editSubTask: any = (subTaskId, taskId)=>{
    if(!this.editSubTaskName){
      this.toastr.warningToastr("Please provide SubTask name")
    } else{
      let data = {
        taskId: taskId,
        subTaskId:subTaskId,
        subTaskName: this.editSubTaskName
      }

      this.http.editParticaularSubTask(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("SubTask Name Edited")
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
    } 
  } // end edit SubTask

  // End Sub Task related Functions

  public getAllHistory: any = ()=>{
    this.http.getAllToDoHistory(this.currentListId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          for(let history of apiResponse.data){
            let historyData = {
              historyId: history.historyId,
              action: history.action,
            }
            this.historyDetails.push(historyData)
          }
        }else {
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get All History

  //function to perform undo operation

  public undoFunction: any = ()=>{
    let currentHistory
    this.getAllHistory()
    for(let i=0; i<this.historyDetails.length; i++){
      currentHistory= this.historyDetails[0]
    }
    if(currentHistory.action === "Sub-Task Status Changed"){
      this.undoSubTaskChanged(currentHistory.historyId)
    }

  } // end undo function

  /**
   * 
   * 
   * Handling Socket related events
   * 
   * 
   */

  public undoNewTask: any = (historyId)=>{
    this.socket.undoNewTask(historyId)
    this.toastr.successToastr('Undo new task successful')
  } // end undo function

  public undoSubTaskChanged: any = (historyId)=>{
    this.socket.undoSubtaskStatus(historyId)
    this.toastr.successToastr('Undo Subtask Status Successful')
  } // end undo sub task status


}

import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private baseurl = "http://todo.sanjayinfotechy.com/api/v1"

  public signupFunction(data): Observable<any> {
    let params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('country', data.country)
      .set('countryCode', data.countryCode)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.baseurl}/user/signup`, params)
  } // end user signup

  public loginFunction(data): Observable<any> {
    let params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)

      return this.http.post(`${this.baseurl}/user/login`, params)
  } // end login function

  public forgotPasswordLink(email): Observable<any> {
    let params = new HttpParams()
      .set('email', email)

    return this.http.post(`${this.baseurl}/user/forgot-password`, params)
  } // end forgot password link

  public resetForgotPassword(data): Observable<any>{
    let params = new HttpParams()
      .set('password', data.password)
    return this.http.post(`${this.baseurl}/user/${data.userId}/reset-password`, params)
  } // end reset forgot password

  public logoutFunction(userId): Observable<any> {
    return this.http.post(`${this.baseurl}/user/logout`, userId)
  }  // end logout function

  public getAllContries(): Observable<any>{
    return this.http.get(`../assets/json/countries.json`)
  } // end get all countries

  public getAllContryCodes(): Observable<any>{
    return this.http.get(`../assets/json/countryCodes.json`)
  } // end get All Country codes

  public setUserInfoToLocalStorage: any = (data)=>{
    localStorage.setItem('userInfo', JSON.stringify(data))
  } // end set user info to local storage

  public getUserInfoFromLocalStorage: any = ()=>{
    return JSON.parse(localStorage.getItem('userInfo'))
  } // end get user infor from Local storage

  public deleteUserInfoFromLocalStorage: any = () =>{
    localStorage.removeItem('userInfo')
  } // end delete user info from local storage

  public getSingleUser(data): Observable<any> {
    return this.http.get(`${this.baseurl}/user/get/user?authToken=${data.authToken}&userId=${data.userId}`, data.userId)
  } // end get single user

  public editUserDetails(data): Observable<any> {
    let params = new HttpParams()
      .set('authToken', data.authToken)
      .set('userId', data.userId)
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('country', data.country)
      .set('countryCode', data.countryCode)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)

    return this.http.put(`${this.baseurl}/user/edit/userId`, params)
  } // end edit user details

  public changePassword(data): Observable<any>{
    let params = new HttpParams()
      .set('userId', data.userId)
      .set('authToken', data.authToken)
      .set('password', data.password)

    return this.http.post(`${this.baseurl}/user/change/password`, params)
  } // end change password

  public getAllUsers(authToken): Observable<any>{
    return this.http.get(`${this.baseurl}/user/get/all?authToken=${authToken}`)
  } // end get all user

  /**
   * 
   * Http Requests for todo
   * 
   */

   public createToDoList(data): Observable<any>{
     let params = new HttpParams()
      .set('userId', data.userId)
      .set('listName', data.listName)
      .set('visibility', data.visibility)

      return this.http.post(`${this.baseurl}/toDo/create`, params)
   } // end create todo list

   public getAllToDoList(userId): Observable<any>{
      return this.http.get(`${this.baseurl}/toDo/get-all/user/todolist?userId=${userId}`)
   } // end get all to do list

   public getSingleToDoList(listId): Observable<any>{
    return this.http.get(`${this.baseurl}/toDo/get/todo?listId=${listId}`)
   } // end get single todo list

   public deleteToDoList(listId): Observable<any>{
     let params = new HttpParams()
      .set('listId', listId)
    return this.http.post(`${this.baseurl}/toDo/delete/todolist`, params)
   } // end delete todo list

   public createTask(data): Observable<any>{
    let params = new HttpParams()
      .set('listId', data.listId)
      .set('taskName', data.taskName)
    
      return this.http.post(`${this.baseurl}/toDo/create/task`, params)
   } // end create task

   public getAllTask(listId): Observable<any>{
      return this.http.get(`${this.baseurl}/toDo/all/todo/tasks?listId=${listId}`)
   } // end get All Tasks

   public changeTaskStatus(data): Observable<any>{
    let params = new HttpParams()
      .set('taskId', data.taskId)
      .set('status', data.status)
    
    return this.http.put(`${this.baseurl}/toDo/change/task/status`, params)
   } // end change task status

   public editTaskName(data): Observable<any>{
    let params = new HttpParams()
      .set('listId', data.listId)
      .set('taskId', data.taskId)
      .set('taskName', data.taskName)
    
    return this.http.put(`${this.baseurl}/toDo/edit/task`, params)
   } // end edit Task name

   public deleteParticularTask(data): Observable<any>{
    let params = new HttpParams()
      .set('listId', data.listId)
      .set('taskId', data.taskId)

    return this.http.post(`${this.baseurl}/toDo/delete/task`, params)
   } // end delete particular task

   public createSubTask(data): Observable<any>{
   let params = new HttpParams()
    .set('taskId', data.taskId)
    .set('subTaskName', data.subTaskName)

    return this.http.post(`${this.baseurl}/toDo/create/sub/task`, params)
   } // end create sub Task

   public getAllSubTask(taskId): Observable<any>{
    return this.http.get(`${this.baseurl}/toDo/get/sub/tasks?taskId=${taskId}`)
   } // end get all sub task

   public deleteSubTask(subTaskId, taskId): Observable<any>{
    let params = new HttpParams()
      .set('subTaskId', subTaskId)
      .set('taskId', taskId)
    return this.http.post(`${this.baseurl}/toDo/delete/sub/task`, params)
   } // end delete sub Task

   public changeSubTaskStatus(data): Observable<any>{
    let params = new HttpParams()
      .set('taskId', data.taskId)
      .set('subTaskId', data.subTaskId)
      .set('status', data.status)

    return this.http.put(`${this.baseurl}/toDo/change/subtask/status`, params)
   } // end change sub task status

   public editParticaularSubTask(data): Observable<any>{
    let params = new HttpParams()
      .set('taskId', data.taskId)
      .set('subTaskId', data.subTaskId)
      .set('subTaskName', data.subTaskName)

    return this.http.put(`${this.baseurl}/toDo/edit/sub/task`, params)
   } // end edit particular sub task
   
   public getAllToDoHistory(listId): Observable<any>{
    return this.http.get(`${this.baseurl}/toDo/get/todo/history?listId=${listId}`)
   } // end get all todo history


   /** 
    * 
    * Http Request for friend module
    * 
   */

   public getNonFriendsList(userId): Observable<any>{
    return this.http.get(`${this.baseurl}/friends/get/non-friends?userId=${userId}`)
   } // end get non friedns list

   public findRecievedNotification(userId): Observable<any>{
    return this.http.get(`${this.baseurl}/friends/get/received/notifications?userId=${userId}`)
   } // end find recieved notificaitions

   public findSentNotifications(userId): Observable<any>{
    return this.http.get(`${this.baseurl}/friends/get/sent/notifications?userId=${userId}`)
   } // end find sent notifications

   public getUserReceivedRequests(userId): Observable<any>{
    return this.http.get(`${this.baseurl}/friends/get/friend-requests?userId=${userId}`)
   } // end get user received requets

   public getUserSentRequests(userId): Observable<any>{
    return this.http.get(`${this.baseurl}/friends/get/sent-requests?userId=${userId}`)
   } // end get user sent requests

   public getFriendsList(userId): Observable<any>{
    return this.http.get(`${this.baseurl}/friends/get/all-friends?userId=${userId}`)
   } // end get friends list
}

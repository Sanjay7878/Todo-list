import { Injectable, OnInit } from '@angular/core';

import * as io from 'socket.io-client'

import { Observable } from 'rxjs'
import { Cookie } from 'ng2-cookies'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = "http://todo.sanjayinfotechy.com"
  private socket;

  constructor(private http: HttpClient) { 
    // conneting to server side socket
    this.socket =io(this.url)
  }

  public verifyUserConfirmation: any =() =>{
    this.verifyUser().subscribe(
      (data)=>{
        this.setUser(Cookie.get('authToken'))
        console.log("User Verified")
      }
    )
  } // end verify user confirmation

  public verifyUser: any = ()=>{
    return Observable.create((observer)=>{
      this.socket.on('verify-user', (data)=>{
        observer.next(data)
      })
    })
  } // end verify user

  public setUser: any = (authToken) =>{
    this.socket.emit('set-user', authToken)
  } // end set user

  public disconnectSocket: any = () =>{
    return Observable.create((observer)=>{
      this.socket.on('disconnect', ()=>{
        observer.next()
      })
    })
  } // end disconnect socket

  public exitSocket: any= ()=>{
    this.socket.disconnect()
  } // end exit socket

  public onlineUsers: any = ()=>{
    return Observable.create((observer)=>{
      this.socket.on('online-user-list', (data)=>{
        observer.next(data)
      })
    })
  } // end online users

  public undoNewTask: any = (historyId)=>{
    this.socket.emit('undoTask', historyId)
  } // end undo new task

  public undoSubtaskStatus: any = (historyId)=>{
    this.socket.emit('undoSubTaskStatus', historyId)
  } // end undo sub task status


  /**
   * 
   * Socket events for friends module
   * 
   */

   public sendFriendRequest: any = (data)=>{
      this.socket.emit('send-friend-request', data)
   } // end send friend request

   public acceptFriendRequest: any =(data)=>{
    this.socket.emit('accept-friend-request', data)
   } // end accept friend Request

   public changeFriendRequestStatus: any = (data)=>{
    this.socket.emit('change-status', data)
   } // end change friend request status

   public removeFriend: any = (data)=>{
    this.socket.emit('remove-friend', data)
   } // end remove friend

   
   public markAsSeen: any = (notificationId)=>{
    this.socket.emit('mark-seen', notificationId)
   } // end mark as seen
}

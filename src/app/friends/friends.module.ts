import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { ViewFriendsComponent } from './view-friends/view-friends.component';
import { RouterModule } from '@angular/router';
import { SingleFriendComponent } from './single-friend/single-friend.component';
import { SocketService } from '../socket.service';
import { Cookie } from 'ng2-cookies';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications/notifications.component';
import { SentNotificationsComponent } from './sent-notifications/sent-notifications.component';
import { SharedModule } from '../shared/shared.module';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { SentRequestsComponent } from './sent-requests/sent-requests.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AddFriendsComponent, ViewFriendsComponent,  SingleFriendComponent, NotificationsComponent, SentNotificationsComponent, FriendRequestsComponent, SentRequestsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {path: 'add/friends', component: AddFriendsComponent},
      {path: 'view/all/friends', component: ViewFriendsComponent},
      {path: 'view/:friendId/details', component: SingleFriendComponent},
      {path: 'notifications', component: NotificationsComponent},
      {path: 'sent/notifications', component: SentNotificationsComponent},
      {path: 'friend/requests', component: FriendRequestsComponent},
      {path: 'all/requests', component: SentRequestsComponent}
    ])
  ],
  providers: [SocketService]
})
export class FriendsModule {

  constructor(private socket: SocketService){}

  public verifyUserConfirmation: any =() =>{
    this.socket.verifyUser().subscribe(
      (data)=>{
        this.socket.setUser(Cookie.get('authToken'))
        console.log("User Verified")
      }
    )
  } // end verify user confirmation
 }

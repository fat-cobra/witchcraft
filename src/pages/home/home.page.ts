import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoomService } from '../../services/room.service';
import { WaitingRoomPage } from '../waiting-room/waiting-room.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private user;
  private enteredRoomId = '';

  constructor(private nav: NavController, private afAuth: AngularFireAuth, private roomService: RoomService) {
    this.afAuth.authState.subscribe(state => {
      this.user = state;
    });
  }

  private createRoom() {
    let room = this.roomService.create().then(room =>
      this.nav.push(WaitingRoomPage, {
        room
      })
    );
  }

  private joinRoom() {
    if (this.enteredRoomId) {
      this.roomService.join(this.user.uid, this.enteredRoomId).then(room =>
        this.nav.push(WaitingRoomPage, {
          room
        })
      );
    }
  }

}

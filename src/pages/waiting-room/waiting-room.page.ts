import { RoomService } from './../../services/room.service';
import { Observable } from 'rxjs/Observable';
import { Room } from './../../models/room.model';
import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { UserState } from '../../models/member-state-change.model';

@Component({
    selector: 'page-waiting-room',
    templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage {
    private room: Room;

    constructor(params: NavParams, private roomService: RoomService) {
        this.room = params.get('room');
        console.log(this.room);
        this.roomService.listenToMembers().subscribe(event => {
            console.log(`User ${event.user} has ` + (event.state == UserState.Connected ? 'joined' : 'left'));
            this.room.members = event.newMembers;
        })
    }
}

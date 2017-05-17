import { Observable } from 'rxjs/Observable';
import { Room } from './../../models/room.model';
import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";

@Component({
    selector: 'page-waiting-room',
    templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage {
    private room: Room;
    private isLeader: Boolean;

    constructor(params: NavParams) {
        this.room = params.get('room');
        console.log(this.room);
        this.isLeader = true; // Not implemented
    }
}

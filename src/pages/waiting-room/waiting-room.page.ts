import { Observable } from 'rxjs/Observable';
import { Room } from './../../models/room.model';
import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";

@Component({
    selector: 'page-waiting-room',
    templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage {
    private room: Observable<Room>;

    constructor(params: NavParams) {
        this.room = params.get('room');
        this.room.subscribe(x => console.log(x));
    }
}

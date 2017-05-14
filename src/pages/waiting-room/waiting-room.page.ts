import { Observable } from 'rxjs/Observable';
import { Room } from './../../models/room.model';
import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { RoomService } from '../../services/room.service';

@Component({
    selector: 'page-waiting-room',
    templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage {
    private room: Observable<Room>;
    members: string[];

    constructor(params: NavParams, private roomService: RoomService) {
        this.room = params.get('room');
        this.room.subscribe(x => console.log(x));
        this.room.subscribe(room => {
        	this.roomService.listMembers(room.$key).subscribe(members => {
        		this.members = members;
        		console.log(members);
        	});
        });
    }
}

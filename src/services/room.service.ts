import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Room } from '../models/room.model';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RoomService {
    constructor(private db: AngularFireDatabase) {

    }

    create(leaderId: string): Observable<Room> {
        let room: Room = {
            roomId: this.generateId(),
            leaderId
        };

        let roomKey = this.db.list('/rooms').push(room).key;
        this.db.object(`/room-map/${room.roomId}`).set(roomKey);

        this.join(leaderId, room.roomId);

        return this.db.object(`/rooms/${roomKey}`);
    }

    join(userId: string, roomId: string) {
        this.db.object(`/room-map/${roomId}`).subscribe(obj => {
            if (obj.$value) {
                let roomKey = obj.$value;
                this.db.object(`/rooms/${roomKey}/members/${userId}`).set(true);
            }
        });
    }

    listMembers(roomKey: string) {
        return this.db.list(`/rooms/${roomKey}/members/`);
    }

    private generateId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}
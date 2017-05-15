import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Room } from '../models/room.model';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RoomService {
    constructor(private db: AngularFireDatabase) { }

    get(roomKey: string) {
        return this.db.object(`/rooms/${roomKey}`);
    }

    getById(roomId: string): Observable<Room> {
        return this.db.object(`/room-map/${roomId}`)
            .switchMap(x => this.db.object(`/rooms/${x.$value}`));
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
            }
        });

        this.getById(roomId).subscribe(room => {
            this.db.object(`/rooms/${room.$key}/members/${userId}`).set(true);
        })

        return this.getById(roomId);
    }   

    private generateId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}
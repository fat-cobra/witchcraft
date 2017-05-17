import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Room } from '../models/room.model';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as socketIo from 'socket.io-client';


@Injectable()
export class RoomService {
    private socket: SocketIOClient.Socket;

    constructor(private db: AngularFireDatabase) {
        this.socket = socketIo('http://localhost:8080');
    }

    get(roomKey: string): Observable<Room> {
        return this.db.object(`/rooms/${roomKey}`);
    }

    getById(roomId: string): Observable<Room> {
        return this.db.object(`/room-map/${roomId}`)
            .switchMap(x => this.db.object(`/rooms/${x.$value}`));
    }

    create(leaderId: string): Promise<Room> {
        return new Promise<Room>((resolver, reject) => {
            this.socket.emit('create-room', leaderId)
                .once('create-room-response', (room) => room ? resolver(room) : reject('Could not create room'));
        });
    }

    join(userId: string, roomId: string) : Promise<void> {
        return new Promise<void>((resolver, reject) => {
            this.socket.emit('join-room', roomId)
                .once('join-room-response', (response) => response ? resolver() : reject());
        });
    }
}
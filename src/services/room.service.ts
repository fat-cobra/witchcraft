import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Room } from '../models/room.model';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as socketIo from 'socket.io-client';
import { MemberStateChange } from '../models/member-state-change.model';


@Injectable()
export class RoomService {
    private socket: SocketIOClient.Socket;
    private memberListenEmitters: SocketIOClient.Emitter[];

    constructor(private db: AngularFireDatabase) {
        this.socket = socketIo('http://localhost:8080');
        this.memberListenEmitters = [];
    }

    create(): Promise<Room> {
        return new Promise<Room>((resolver, reject) => {
            this.socket.emit('create-room')
                .once('create-room-response', room => room ? resolver(room) : reject('Could not create room'));
        });
    }

    join(userId: string, roomId: string): Promise<Room> {
        return new Promise<Room>((resolver, reject) => {
            this.socket.emit('join-room', roomId)
                .once('join-room-response', room => room ? resolver(room) : reject());
        });
    }

    listenToMembers(): Observable<MemberStateChange> {
        return new Observable<MemberStateChange>(subscriber => {
            this.socket.on('member-state-changed', memberStateChange => {
                console.log(memberStateChange);
                subscriber.next(memberStateChange);
            });
        });
    }

    stopListeningToMembers() {
        this.memberListenEmitters.forEach(emitter => emitter.removeAllListeners());
        this.memberListenEmitters = [];
    }
}
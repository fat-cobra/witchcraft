import { MemberStateChange } from '../../src/models/member-state-change.model';
import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import { Room } from '../../src/models/room.model';

enum UserState {
    Disconnected,
    Connected,
}

class Server {
    public static readonly PORT = 8080;
    public expressApp: express.Application;
    private httpServer: any;
    private io: SocketIO.Server;

    private rooms: Room[];

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.expressApp = express();
        this.httpServer = http.createServer(this.expressApp);
        this.io = socketIo(this.httpServer);

        this.rooms = [];

        this.listen();
    }

    private listen(): void {
        this.httpServer.listen(Server.PORT, () => {
            console.log('Running server on port %s', Server.PORT);
        });

        this.io.on('connect', (socket: SocketIO.Socket) => {
            console.log('Connected client on port %s.', Server.PORT);
            socket.on('create-room', () => {
                let room: Room = {
                    leaderId: socket.client.id,
                    roomId: this.generateId(),
                    members: [socket.client.id],
                };

                socket.join(room.roomId);

                this.rooms.push(room);
                socket.emit('create-room-response', room);
                console.log('Room created', room);
            });

            socket.on('join-room', (roomId: string) => {
                let room = this.rooms.find(room => room.roomId == roomId);

                room.members.push(socket.client.id);
                socket.join(room.roomId);
                socket.in(room.roomId).emit('member-state-changed', <MemberStateChange>{
                    user: socket.client.id,
                    state: UserState.Connected,
                    newMembers: room.members,
                });

                socket.emit('join-room-response', room);
                console.log('User joined room', room);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
                this.rooms
                    .filter(room => room.members.some(member => member == socket.client.id))
                    .forEach(room => {
                        socket.in(room.roomId).emit("member-state-changed", <MemberStateChange>{
                            user: socket.client.id,
                            state: UserState.Disconnected,
                            newMembers: room.members,
                        });
                        room.members.splice(room.members.indexOf(socket.client.id), 1);
                    });
            });
        });
    }

    private generateId() {
        let id: string = '';
        do {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (var i = 0; i < 3; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));
        } while (this.rooms.some(room => room.roomId == id));

        return id;
    }
}

export default Server.bootstrap().expressApp;
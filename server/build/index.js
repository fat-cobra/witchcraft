"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var enums_1 = require("./enums");
var Server = (function () {
    function Server() {
        this.expressApp = express();
        this.httpServer = http.createServer(this.expressApp);
        this.io = socketIo(this.httpServer);
        this.rooms = [];
        this.listen();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.httpServer.listen(Server.PORT, function () {
            console.log('Running server on port %s', Server.PORT);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', Server.PORT);
            socket.on('create-room', function () {
                var room = {
                    leaderId: socket.client.id,
                    roomId: _this.generateId(),
                    members: [socket.client.id],
                    isMine: true,
                };
                socket.join(room.roomId);
                _this.rooms.push(room);
                socket.emit('create-room-response', room);
                console.log('Room created', room);
            });
            socket.on('join-room', function (roomId) {
                var room = _this.rooms.find(function (room) { return room.roomId == roomId; });
                if (room) {
                    room.isMine = (room.leaderId == socket.client.id);
                    room.members.push(socket.client.id);
                    socket.join(room.roomId);
                    socket.in(room.roomId).emit('member-state-changed', {
                        user: socket.client.id,
                        state: enums_1.UserState.Connected,
                        newMembers: room.members,
                    });
                    socket.emit('join-room-response', room);
                    console.log('User joined room', room);
                }
                else {
                    socket.emit('join-room-response', undefined);
                }
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
                _this.rooms
                    .filter(function (room) { return room.members.some(function (member) { return member == socket.client.id; }); })
                    .forEach(function (room) {
                    socket.in(room.roomId).emit("member-state-changed", {
                        user: socket.client.id,
                        state: enums_1.UserState.Disconnected,
                        newMembers: room.members,
                    });
                    room.members.splice(room.members.indexOf(socket.client.id), 1);
                });
            });
        });
    };
    Server.prototype.generateId = function () {
        var id = '';
        do {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (var i = 0; i < 3; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));
        } while (this.rooms.some(function (room) { return room.roomId == id; }));
        return id;
    };
    return Server;
}());
Server.PORT = 8080;
exports.default = Server.bootstrap().expressApp;

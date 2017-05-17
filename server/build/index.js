"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
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
            socket.on('create-room', function (leaderId) {
                var room = {
                    leaderId: leaderId,
                    roomId: _this.generateId(),
                    members: [leaderId],
                };
                _this.rooms.push(room);
                socket.emit('create-room-response', room);
                console.log('Room created', room);
            });
            socket.on('join-room', function (roomId) {
                var room = _this.rooms.find(function (room) { return room.roomId == roomId; });
                socket.emit('join-room-response', true);
                console.log('User joined room', room);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    Server.prototype.generateId = function () {
        var id = '';
        do {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (var i = 0; i < 5; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));
        } while (this.rooms.some(function (room) { return room.roomId == id; }));
        return id;
    };
    return Server;
}());
Server.PORT = 8080;
exports.default = Server.bootstrap().expressApp;

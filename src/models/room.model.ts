import { FirebaseModel } from './firebase-model.model';

export class Room extends FirebaseModel {
    roomId: string;
    leaderId: string;
}
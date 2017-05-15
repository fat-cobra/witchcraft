import { FirebaseBaseModel } from './firebase-base.model';

export class Room extends FirebaseBaseModel {
    roomId: string;
    leaderId: string;
}
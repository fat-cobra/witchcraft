export class MemberStateChange {
    user: string;
    state: UserState;
    newMembers: string[];
}

export enum UserState {
    Disconnected,
    Connected,
}
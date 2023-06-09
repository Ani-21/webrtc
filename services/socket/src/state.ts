interface IUser {
    id: string;
    name: string;
}

interface IMessage {
    id: string;
    userId: string;
    timestamp: Date;
    message: string;
}

class State {
    private users: IUser[];
    private messages: IMessage[];

    constructor() {
        this.users = [];
        this.messages = [];
    }

    getUsers() {
        return this.users;
    }

    addNewUser(user: IUser) {
        this.users.push(user);
    }

    addNewMessage(msg: IMessage) {
        this.messages.push(msg);
    }

    getMessages() {
        return this.messages;
    }
}

const state = new State();
export const AppState = state;

interface IUser {
    id: string;
    name: string;
}

class State {
    private users: IUser[];
    private messages: string[];
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

    getMessages() {
        return this.messages;
    }
}

const state = new State();
export const AppState = state;

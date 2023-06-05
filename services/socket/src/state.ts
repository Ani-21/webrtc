interface IUser {
    id: string;
    name: string;
}

let instance:any = null;
const messages: string[] = []
const users: IUser[] = []

class State {
    constructor() {
        if(instance) {
            throw new Error('State already exits')
        }
        instance = this
    }
    
    getUsers() {
        return users
    }

    addNewUser(user: IUser) {
        users.push(user)
    }

    getMessages() {
        return messages
    }
}

const singletonState = Object.freeze(new State());
export default singletonState
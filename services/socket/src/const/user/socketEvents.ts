export enum SocketRoom {
    room = "room",
}

export enum SocketUserEvent {
    validateEnter = "user:validateEnter",
    logout = "user:logout",
}

export enum SocketUserError {
    fullRoomError = "fullRoomError",
    invalidNameError = "invalidNameError",
}

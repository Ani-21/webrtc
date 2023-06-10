export enum SocketEvent {
  userLogin = 'user:login',
  userValidateEnter = 'user:validateEnter',
  sendMessage = 'messages:sendMessage',
  recieveMessage = 'messages:recieveMessage',
}

export enum SocketError {
  userFullRoomError = 'fullRoomError',
  userInvalidNameError = 'invalidNameError',
}

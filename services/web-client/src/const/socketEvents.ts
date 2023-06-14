export enum SocketEvent {
  userLogin = 'user:login',
  userLogout = 'user:logout',
  userValidateEnter = 'user:validateEnter',
  sendMessage = 'messages:sendMessage',
  recieveMessage = 'messages:recieveMessage',
}

export enum SocketError {
  userFullRoomError = 'fullRoomError',
  userInvalidNameError = 'invalidNameError',
}

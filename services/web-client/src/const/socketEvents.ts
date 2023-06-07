export enum SocketEvent {
  userLogin = "user:login",
  userValidateEnter = "user:validateEnter",
  sendMessage = "messages:sendMessage",
  recieveMessage = "messages:recieveMessage",
  getMessages = "messages:getMessages",
}

export enum SocketError {
  userFullRoomError = "fullRoomError",
  userInvalidNameError = "invalidNameError",
}
